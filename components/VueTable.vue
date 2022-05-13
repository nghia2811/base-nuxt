<template>
  <div>
    <table data-table>
      <VueTableHeader
        :data="tableData.header"
        :sort-by="pagination.sortBy"
        :sort-direction="pagination.descending ? 'desc' : 'asc'"
        @sort-change="mergePagingData($event)"/>
      <VueTableBody
        :header="tableData.header"
        :rows="tableData.rows"
        :row-expand="true"
        :multiple-expand="true"
        @click="handleRowClick($event)">
        <template v-slot:actions="{row}">
          actions + {{ row.name }}
        </template>
        <template v-slot:expand="{row}">
          expand + {{ row.name }}
        </template>
      </VueTableBody>
    </table>
    <pagination :page="pagination.page"
                :limit="pagination.limit"
                :total="pagination.total"
                @per-page-change="mergePagingData($event)"
                @page-change="mergePagingData($event)"/>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import VueTableHeader from '~/components/VueTableHeader.vue'
  import Pagination from '~/components/Pagination.vue'
  import VueTableBody from '~/components/VueTableBody.vue'
  import lodash from 'lodash'

  export default Vue.extend({
    name      : 'VueTable',
    components: {
      VueTableBody,
      VueTableHeader,
      Pagination
    },
    data      : function () {
      return {
        pagination: {
          page       : 1,
          limit: 10,
          total      : 0,
          descending : false,
          sortBy     : null
        },
        tableData : {
          header: [
            {
              text    : 'name',
              value   : 'name',
              sortable: true
            }, {
              text    : 'power',
              value   : 'power',
              sortable: true
            }, {
              text    : 'actions',
              value   : 'actions',
              sortable: false
            }
          ],
          rows  : [
            {name: 'Chuck Norris', power: Infinity, id: 1},
            {name: 'Bruce Lee', power: 9000, id: 2},
            {name: 'Jackie Chan', power: 7000, id: 3},
            {name: 'Jet Li', power: 8000, id: 4}
          ]
        }
      }
    },
    methods   : {
      mergePagingData(data: any) {
        this.pagination = lodash.merge(this.pagination, data)
        // this.refresh()
      },
      handleRowClick(value: any) {
        console.log('rowClick')
        console.log(value)
      }
    }
  })
</script>

<style scoped lang="scss">

</style>
