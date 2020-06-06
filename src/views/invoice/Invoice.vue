<template>
    <div id="invoice-page">

        <div class="flex flex-wrap items-center justify-between">
          <vx-input-group class="mb-base mr-3">
            <vs-input v-model="invoice.appointment.email" placeholder="Email" disabled/>
            <template slot="append">
              <div class="append-text btn-addon">
                <vs-button type="border" @click="sendInvoice" class="whitespace-no-wrap">Send Invoice</vs-button>
              </div>
            </template>
          </vx-input-group>
          <div class="flex items-center">
            <vs-button class="mb-base mr-3" type="border" icon-pack="feather" icon="icon icon-download">Download</vs-button>
            <vs-button class="mb-base mr-3" icon-pack="feather" icon="icon icon-file" @click="printInvoice">Print</vs-button>
          </div>
        </div>

        <vx-card id="invoice-container">

            <!-- INVOICE METADATA -->
            <div class="vx-row leading-loose p-base">
                <div class="vx-col w-1/2 mt-base">
                    <img src="@/assets/images/logo/logo.png" alt="vuexy-logo">
                </div>
                <div class="vx-col w-1/2 text-right">
                    <h1>Invoice</h1>
                    <div class="invoice__invoice-detail mt-6">
                        <h6>INVOICE NO.</h6>
                        <p>{{ invoice.invoice_number }}</p>

                        <h6 class="mt-4">INVOICE DATE</h6>
                        <p>{{ invoice.created_at | date(true) }}</p>
                    </div>
                </div>
                <div class="vx-col w-1/2 mt-12">
                    <h5>Recipient</h5>
                    <div class="invoice__recipient-info my-4">
                        <p>{{ invoice.appointment.patient_name }}</p>
                    </div>
                    <div class="invoice__recipient-contact ">
                        <p class="flex items-center">
                            <feather-icon icon="MailIcon" svgClasses="h-4 w-4"></feather-icon>
                            <span class="ml-2">{{ invoice.appointment.email }}</span>
                        </p>
                        <p class="flex items-center">
                            <feather-icon icon="PhoneIcon" svgClasses="h-4 w-4"></feather-icon>
                            <span class="ml-2">{{ invoice.appointment.phone }}</span>
                        </p>
                    </div>
                </div>
                <div class="vx-col w-1/2 mt-base text-right mt-12">
                    <h5>{{ invoice.clinic_name }}</h5>
                    <div class="invoice__company-info my-4">
                        <p>{{ invoice.clinic_address }}</p>
                    </div>
                    <div class="invoice__company-contact">
                        <p class="flex items-center justify-end">
                            <feather-icon icon="MailIcon" svgClasses="h-4 w-4"></feather-icon>
                            <span class="ml-2">{{ invoice.clinic_email }}</span>
                        </p>
                        <p class="flex items-center justify-end">
                            <feather-icon icon="PhoneIcon" svgClasses="h-4 w-4"></feather-icon>
                            <span class="ml-2">{{ invoice.clinic_phone }}</span>
                        </p>
                    </div>

                </div>
            </div>

            <!-- INVOICE CONTENT -->
            <div class="p-base">
                <!-- INVOICE TASKS TABLE -->
                <vs-table hoverFlat>
                    <!-- HEADER -->
                    <template slot="thead">
                        <vs-th class="pointer-events-none">SERVICE DESCRIPTION</vs-th>
                        <vs-th class="pointer-events-none">AMOUNT</vs-th>
                    </template>

                    <!-- DATA -->
                    <template>
                        <vs-tr>
                            <vs-td>{{ invoice.description }}</vs-td>
                            <vs-td>P{{ invoice.amount }}</vs-td>
                        </vs-tr>
                    </template>
                </vs-table>

                <!-- INVOICE SUMMARY TABLE -->
                <vs-table hoverFlat class="w-1/2 ml-auto mt-4">
                    <vs-tr>
                        <vs-th class="pointer-events-none">SUBTOTAL</vs-th>
                        <vs-td>P{{ invoice.amount }}</vs-td>
                    </vs-tr>
                    <vs-tr>
                        <vs-th class="pointer-events-none">TOTAL</vs-th>
                        <vs-td>P{{ invoice.amount }}</vs-td>
                    </vs-tr>
                </vs-table>
            </div>

            <!-- INVOICE FOOTER -->
            <div class="invoice__footer text-right p-base">
                <p class="mb-4">Transfer the amounts to the business amount below. Please include invoice number on your check.</p>
                <p>
                    <span class="mr-8">BANK: <span class="font-semibold">FTSBUS33</span></span>
                    <span>IBAN: <span class="font-semibold"> G882-1111-2222-3333 </span></span>
                </p>
            </div>
        </vx-card>
    </div>
</template>

<script>

export default{
    data () {
        return {
            invoice: [],
        }
    },
    computed: {

    },
    methods: {
        printInvoice () {
            window.print()
        },
        async sendInvoice() {
            await this.$store.dispatch('invoice/mailInvoice', this.invoice.id)

            this.$vs.notify({
                color: 'success',
                title: 'Invoice Sent',
                text: 'Invoice sent successfully'
            })
        }
    },
    components: {},
    mounted () {
        this.$emit('setAppClasses', 'invoice-page')
    },
    created() {
        this.invoice = this.$route.params.invoice
    }
}
</script>

<style lang="scss">
@media print {
  .invoice-page {
    * {
      visibility: hidden;
    }

    #content-area {
      margin: 0 !important;
    }

    .vs-con-table {
      .vs-con-tbody {
        overflow: hidden !important;
      }
    }

    #invoice-container,
    #invoice-container * {
      visibility: visible;
    }
    #invoice-container {
      position: absolute;
      left: 0;
      top: 0;
      box-shadow: none;
    }
  }
}

@page {
  size: auto;
}
</style>
