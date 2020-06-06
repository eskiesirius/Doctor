<template>
  <div id="data-list-list-view" class="data-list-container">

    <vs-table ref="table" multiple v-model="selected" pagination :max-items="itemsPerPage" search :data="invoices">

      <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">

        <div class="flex flex-wrap-reverse items-center data-list-btn-container">

          <!-- ACTION - DROPDOWN -->
          <vs-dropdown vs-trigger-click class="dd-actions cursor-pointer mr-4 mb-4">

            <div class="p-4 shadow-drop rounded-lg d-theme-dark-bg cursor-pointer flex items-center justify-center text-lg font-medium w-32 w-full">
              <span class="mr-2">Actions</span>
              <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
            </div>

            <vs-dropdown-menu>

              <vs-dropdown-item @click="deleteMark">
                <span class="flex items-center">
                  <feather-icon icon="TrashIcon" svgClasses="h-4 w-4" class="mr-2" />
                  <span>Delete</span>
                </span>
              </vs-dropdown-item>
            </vs-dropdown-menu>
          </vs-dropdown>
        </div>

        <!-- ITEMS PER PAGE -->
        <vs-dropdown vs-trigger-click class="cursor-pointer mb-4 mr-4 items-per-page-handler">
          <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
            <span class="mr-2">{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ invoices.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : invoices.length }} of {{ queriedItems }}</span>
            <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
          </div>
          <vs-dropdown-menu>

            <vs-dropdown-item @click="itemsPerPage=4">
              <span>4</span>
            </vs-dropdown-item>
            <vs-dropdown-item @click="itemsPerPage=10">
              <span>10</span>
            </vs-dropdown-item>
            <vs-dropdown-item @click="itemsPerPage=15">
              <span>15</span>
            </vs-dropdown-item>
            <vs-dropdown-item @click="itemsPerPage=20">
              <span>20</span>
            </vs-dropdown-item>
          </vs-dropdown-menu>
        </vs-dropdown>
      </div>

      <template slot="thead">
        <vs-th sort-key="invoice_number">Invoice Number</vs-th>
        <vs-th sort-key="clinic_name">Clinic Name</vs-th>
        <vs-th sort-key="patient_name">Patient Name</vs-th>
        <vs-th sort-key="phone">Phone</vs-th>
        <vs-th sort-key="email">Email</vs-th>
        <vs-th sort-key="amount">Amount</vs-th>
        <vs-th sort-key="paid_on">Paid On</vs-th>
        <vs-th>Action</vs-th>
      </template>

        <template slot-scope="{data}">
          <tbody>
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">

              <vs-td>
                <p class="product-code font-medium truncate">{{ tr.invoice_number }}</p>
              </vs-td>
              <vs-td>
                <p class="product-clinic_name font-medium truncate">{{ tr.clinic_name }}</p>
              </vs-td>
              <vs-td>
                <p class="product-patient_name font-medium truncate">{{ tr.appointment.patient_name }}</p>
              </vs-td>
              <vs-td>
                <p class="product-phone font-medium truncate">{{ tr.appointment.phone }}</p>
              </vs-td>
              <vs-td>
                <p class="product-email font-medium truncate">{{ tr.appointment.email }}</p>
              </vs-td>

              <vs-td>
                <p class="product-price">P{{ tr.amount }}</p>
              </vs-td>

              <vs-td>
                <p class="product-paid_on font-medium truncate">{{ tr.paid_on }}</p>
              </vs-td>

              <vs-td class="whitespace-no-wrap">
                <feather-icon icon="EyeIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current" @click.stop="showData(tr)" />
                <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current" class="ml-2" @click.stop="deleteData(tr.id)" />
              </vs-td>

            </vs-tr>
          </tbody>
        </template>
    </vs-table>
  </div>
</template>

<script>
import moduleInvoice from '@/store/invoice/moduleInvoice.js'

export default {
  data () {
    return {
      selected: [],
      // invoices: [],
      itemsPerPage: 4,
      isMounted: false,
      selectedId: null,
    }
  },
  computed: {
    currentPage () {
      if (this.isMounted) {
        return this.$refs.table.currentx
      }
      return 0
    },
    invoices () {
      return this.$store.state.invoice.invoices
    },
    queriedItems () {
      return this.$refs.table ? this.$refs.table.queriedResults.length : this.invoices.length
    }
  },
  methods: {
    deleteData (id) {
        this.selectedId = id

        this.$vs.dialog({
            type: 'confirm',
            color: 'danger',
            title: `Delete Invoice`,
            text: 'Are you sure you want to delete this invoice?',
            accept: this.deleteAccept
        })
    },
    async deleteAccept() {
        await this.$store.dispatch('invoice/deleteInvoice', this.selectedId)
        this.selectedId = null
        this.$vs.notify({
            color: 'success',
            title: 'Invoice Deleted',
            text: 'The invoice was successfully deleted'
        })
    },
    showData (invoice) {
        this.$router.push({ name: 'invoice-details', params: { id: invoice.id, invoice:invoice } })
    },
    deleteMark() {
        if (this.selected.length == 0)
            return

        this.$vs.dialog({
            type: 'confirm',
            color: 'danger',
            title: `Delete Invoices`,
            text: 'Are you sure you want to delete the selected invoices?',
            accept: this.deleteMarkAccept
        })
    },
    async deleteMarkAccept() {
        await this.$store.dispatch('invoice/deleteMarkInvoice', this.selected)
        this.selected = []
        this.$vs.notify({
            color: 'success',
            title: 'Invoices Deleted',
            text: 'The selected invoices was successfully deleted'
        })
    }
  },
  created () {
    if (!moduleInvoice.isRegistered) {
      this.$store.registerModule('invoice', moduleInvoice)
      moduleInvoice.isRegistered = true
    }
    this.$store.dispatch('invoice/fetchInvoices')
  },
  mounted () {
    this.isMounted = true
  }
}
</script>

<style lang="scss">
#data-list-list-view {
  .vs-con-table {

    /*
      Below media-queries is fix for responsiveness of action buttons
      Note: If you change action buttons or layout of this page, Please remove below style
    */
    @media (max-width: 689px) {
      .vs-table--search {
        margin-left: 0;
        max-width: unset;
        width: 100%;

        .vs-table--search-input {
          width: 100%;
        }
      }
    }

    @media (max-width: 461px) {
      .items-per-page-handler {
        display: none;
      }
    }

    @media (max-width: 341px) {
      .data-list-btn-container {
        width: 100%;

        .dd-actions,
        .btn-add-new {
          width: 100%;
          margin-right: 0 !important;
        }
      }
    }

    .product-name {
      max-width: 23rem;
    }

    .vs-table--header {
      display: flex;
      flex-wrap: wrap;
      margin-left: 1.5rem;
      margin-right: 1.5rem;
      > span {
        display: flex;
        flex-grow: 1;
      }

      .vs-table--search{
        padding-top: 0;

        .vs-table--search-input {
          padding: 0.9rem 2.5rem;
          font-size: 1rem;

          &+i {
            left: 1rem;
          }

          &:focus+i {
            left: 1rem;
          }
        }
      }
    }

    .vs-table {
      border-collapse: separate;
      border-spacing: 0 1.3rem;
      padding: 0 1rem;

      tr{
          box-shadow: 0 4px 20px 0 rgba(0,0,0,.05);
          td{
            padding: 20px;
            &:first-child{
              border-top-left-radius: .5rem;
              border-bottom-left-radius: .5rem;
            }
            &:last-child{
              border-top-right-radius: .5rem;
              border-bottom-right-radius: .5rem;
            }
          }
          td.td-check{
            padding: 20px !important;
          }
      }
    }

    .vs-table--thead{
      th {
        padding-top: 0;
        padding-bottom: 0;

        .vs-table-text{
          text-transform: uppercase;
          font-weight: 600;
        }
      }
      th.td-check{
        padding: 0 15px !important;
      }
      tr{
        background: none;
        box-shadow: none;
      }
    }

    .vs-table--pagination {
      justify-content: center;
    }
  }
}
</style>
