<template>
  <v-btn @click="exportPDF" dark color="primary">Exportar PDF</v-btn>
</template>

<script>
import jsPDF from 'jspdf'
import 'jspdf-autotable'

export default {
  props: {
    arrayOT: {
      type: Array,
      require: true,
    },
    datosEncabezado: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {}
  },
  methods: {
    exportPDF() {

      //re-ordenamos el los items
      for (let i=0;i < this.arrayOT.length;i++){
        this.arrayOT[i].item = i+1;
      }

      const cols = [
        { title: '#', dataKey: 'item' },
        { title: 'Sección', dataKey: 'seccion' },
        { title: 'Título', dataKey: 'titulo' },
        { title: 'Real', dataKey: 'real' },
        { title: 'Estado', dataKey: 'estado' },
        { title: 'Observaciones', dataKey: 'observaciones' },
      ]

      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'in',
        format: 'a4',
      })
      doc.page=1;
      function footer(){
      doc.text(7.4, 11.4, 'pag ' + doc.page);
      doc.page ++;
      };

      doc
        .setFontSize(12)
        .setFont('helvetica', 'bold')
        .text('OT_CO_AU_LGBT-01_ME_OT-01115145', 0.7, 0.9)

      //Logo
        try {
          doc.addImage('../logo-softys.png', 'png', 6.1, 0.6, 1.5, 0.7)
        } catch (error) {
          doc.addImage('../../logo-softys.png', 'png', 6.1, 0.6, 1.5, 0.7)
        }
        
      // Using autoTable plugin
      //primera Tabla
      doc.autoTable({
        styles: { lineWidth: 0.01, lineColor: 'black' },
        columnStyles: {
          0: { fontStyle: 'bold', cellWidth: 0.8 },
          1: { cellWidth: 2.3 },
        },
        /*didParseCell: function (HookData) {
            if (HookData.row.index === 0 && HookData.column.index === 2) { 
                HookData.cell.styles.lineColor = [255, 255, 255];
            }
            if (HookData.row.index === 0 && HookData.column.index === 3) {
              HookData.cell.styles.lineColor = [255, 255, 255];
            }
          }, */
        theme: 'grid',
        body: [['Sector:', this.datosEncabezado.sector]],
        margin: { left: 0.7, right: 0.7, top: 1.3 },
      })

      //Segunda parte de la tabla
      doc.autoTable({
        styles: { lineWidth: 0.01, lineColor: 'black' },
        startY: 1.6,
        columnStyles: {
          0: {
            fontStyle: 'bold',
            cellWidth: 0.8,
          },
          1: { cellWidth: 2.3 },
          2: {
            fontStyle: 'bold',
            cellWidth: 1.5,
          },
        },
        theme: 'grid',
        body: [
          [
            'Linea:',
            this.datosEncabezado.linea,
            'Fecha de Solicitud:',
            this.datosEncabezado.f_solicitud,
          ],
          [
            'Máquina:',
            this.datosEncabezado.maquina,
            'Fecha Realizado:',
            this.datosEncabezado.f_realizado,
          ],
          [
            'Serie:',
            this.datosEncabezado.serie,
            'Solicitante:',
            this.datosEncabezado.solicitante,
          ],
          [
            'Grupo:',
            this.datosEncabezado.grupo,
            'Ejecución:',
            this.datosEncabezado.ejecucion,
          ],
          [
            'Tarea:',
            this.datosEncabezado.tarea,
            'Modo de Ingreso:',
            this.datosEncabezado.modoIngreso,
          ],
        ],
        margin: { left: 0.7, right: 0.7 },
      })

      /*doc.setDrawColor(0, 0, 0);
      doc.setLineWidth(0.01).line(2.64, 1.5, 2.64, 1.79);//line of cell table */

      //3ra tabla
      doc.autoTable({
        styles: { lineWidth: 0.01, lineColor: 'black' },
        columnStyles: {
          0: { fontStyle: 'bold', cellWidth: 0.3 },
          1: { cellWidth: 1 },
          2: { cellWidth: 1 },
          3: { cellWidth: 0.5 },
          4: { cellWidth: 0.6 },
        },
        headStyles: { fillColor: [0, 0, 0] },
        theme: 'grid',
        body: this.arrayOT,
        columns: cols,
        margin: { left: 0.51, right: 0.48 },
        didDrawPage: function (data) {
          doc.setDrawColor(0, 0, 0)
          doc.setLineWidth(0.03).rect(0.5, 0.55, 7.3, 10.6)
          footer()
        },
      })

      doc.save('OT.pdf')
    },
  },
}
</script>
<style>
</style>