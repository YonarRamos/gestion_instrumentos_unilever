<template>
  <v-btn
  color="error"
  text
  @click="exportPDF"
  >
    Descargar PDF
  </v-btn>
</template>

<script>
import jsPDF from 'jspdf'
import 'jspdf-autotable'

export default {
  props: {
    equipo: {
      type: Object,
      require: true,
    }
  },
  data() {
    return {}
  },
  methods: {
    exportPDF() {
      console.log("Imprimiendo PDF");
      const cols = [
        { title: 'Tag', dataKey: 'tag' },
        { title: 'Descripción', dataKey: 'descripcion' },
        { title: 'Serie', dataKey: 'serie' },
        { title: 'Fecha de Creación', dataKey: 'fecha_creacion' },
        { title: 'Fecha de Actualización del Equipo', dataKey: 'fecha_actualizacion_equipo' },
        { title: 'Rango D', dataKey: 'rango_de' },
        { title: 'Rango A', dataKey: 'rango_a' },
        { title: 'Rango D Normal', dataKey: 'rango_de_normal' },
        { title: 'Rango A Normal', dataKey: 'rango_a_normal' },
        { title: 'Resolución', dataKey: 'resolucion' },
        { title: 'Tolerancia', dataKey: 'tolerancia' },
        { title: 'Tipo de Instrumento', dataKey: 'tipo_instrumento' },
        { title: 'Unidad', dataKey: 'unidad' },
        { title: 'Magnitud', dataKey: 'magnitud' },
        { title: 'Usuario', dataKey: 'usuario' },
        { title: 'Encargado de Calibración', dataKey: 'encargado_calibracion' },
        { title: 'Fecha de Actualización del Instrumento', dataKey: 'fecha_actualizacion_instrumento' },
        { title: 'Sector', dataKey: 'sector' },
        { title: 'Planta', dataKey: 'planta' },
      ]

      const doc = new jsPDF({
        orientation: 'landscape',
        format: 'a4',
      });

      doc.page=1;
      function footer(){
      doc.text(275, 200, 'pag ' + doc.page);
      doc.page ++;
      };

/*       doc
        .setFontSize(12)
        .setFont('helvetica', 'bold')
        .text('OT_CO_AU_LGBT-01_ME_OT-01115145', 0.7, 0.9) */

      //Logo
/*         try {
          doc.addImage('../logo-softys.png', 'png', 6.1, 0.6, 1.5, 0.7)
        } catch (error) {
          doc.addImage('../../logo-softys.png', 'png', 6.1, 0.6, 1.5, 0.7)
        } */
        
      // Using autoTable plugin
      //primera Tabla
      doc.autoTable({
 /*        styles: { lineWidth: 0.01, lineColor: 'black' },
        columnStyles: {
          0: { fontStyle: 'bold', cellWidth: 0.3 },
          1: { cellWidth: 1 },
          2: { cellWidth: 1 },
          3: { cellWidth: 0.5 },
          4: { cellWidth: 0.6 },
        }, 
        headStyles: { fillColor: [255, 255, 255] },*/
        theme: 'grid',
        body: [this.equipo],
        columns: cols,
/*         margin: { left: 0.51, right: 0.48 }, */
        didDrawPage: function (data) {
/*           doc.setDrawColor(0, 0, 0)
          doc.setLineWidth(0.03).rect(0.5, 0.55, 7.3, 10.6) */
          footer()
        },
      })

      doc.save('Detalle_Equipo.pdf')
    },
  },
}
</script>
<style>
</style>