<template>
    <div id="data-list-list-view" class="data-list-container">
        <vs-table ref="table" multiple v-model="selected" pagination :max-items="itemsPerPage" search :data="appointments">

            <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">

                <div class="flex flex-wrap-reverse items-center data-list-btn-container">

                    <!-- ACTION - DROPDOWN -->
                    <vs-dropdown vs-trigger-click class="dd-actions cursor-pointer mr-4 mb-4">

                        <div class="p-4 shadow-drop rounded-lg d-theme-dark-bg cursor-pointer flex items-center justify-center text-lg font-medium w-32 w-full">
                            <span class="mr-2">Actions</span>
                            <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                        </div>

                        <vs-dropdown-menu>

                            <vs-dropdown-item @click="approveMark">
                                <span class="flex items-center">
                                    <feather-icon icon="ThumbsUpIcon" svgClasses="h-4 w-4" class="mr-2" />
                                    <span>Approve</span>
                                </span>
                            </vs-dropdown-item>

                            <vs-dropdown-item @click="cancelMark">
                                <span class="flex items-center">
                                    <feather-icon icon="XCircleIcon" svgClasses="h-4 w-4" class="mr-2" />
                                    <span>Cancel</span>
                                </span>
                            </vs-dropdown-item>
                        </vs-dropdown-menu>
                    </vs-dropdown>
                </div>

                <!-- ITEMS PER PAGE -->
                <vs-dropdown vs-trigger-click class="cursor-pointer mb-4 mr-4 items-per-page-handler">
                    <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                        <span class="mr-2">{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ appointments.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : appointments.length }} of {{ queriedItems }}</span>
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
                <vs-th sort-key="patient_name">Patient Name</vs-th>
                <vs-th sort-key="appointment_date">Appointment Date</vs-th>
                <vs-th sort-key="status">Status</vs-th>
                <vs-th>Action</vs-th>
            </template>

            <template slot-scope="{data}">
                <tbody>
                    <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">

                        <vs-td>
                            <p class="product-name font-medium truncate">{{ tr.patient_name }}</p>
                        </vs-td>

                        <vs-td>
                            <p class="product-appointment_date">{{ tr.appointment_date | title }}</p>
                        </vs-td>

                        <vs-td>
                            <vs-chip :color="getStatusColor(tr.status)" class="product-order-status">{{ tr.status | title }}</vs-chip>
                        </vs-td>

                        <vs-td class="whitespace-no-wrap">
                            <vs-button style="margin-right:1em" color="success" type="gradient" @click="approve(tr)">Approve</vs-button>
                            <vs-button color="danger" type="gradient" @click="cancel(tr)">Cancel</vs-button>
                        </vs-td>
                    </vs-tr>
                </tbody>
            </template>
        </vs-table>
    </div>
</template>

<script>
import moduleAppointment from '@/store/appointment/moduleAppointment.js'

export default {
    data () {
        return {
            selected: [],
            itemsPerPage: 4,
            isMounted: false,
        }
    },
    computed: {
        currentPage () {
            if (this.isMounted) {
                return this.$refs.table.currentx
            }
            return 0
        },
        appointments () {
            return this.$store.state.appointment.appointments
        },
        queriedItems () {
            return this.$refs.table ? this.$refs.table.queriedResults.length : this.appointments.length
        }
    },
    methods: {
        async approve(appointment) {
            await this.$store.dispatch('appointment/approveAppointment',appointment)

            this.$vs.notify({
                color: 'success',
                title: 'Approved Appointment',
                text: 'Appointment was successfully approved'
            })
        },
        cancel(appointment) {
            console.log(appointment)
        },
        approveMark() {
            if (this.selected.length == 0)
                return

            this.$vs.dialog({
                type: 'confirm',
                color: 'success',
                title: `Approve Appointments`,
                text: 'Are you sure you want to approve the selected appoitments?',
                accept: this.approveAccept
            })
        },
        approveAccept(){
            this.$vs.notify({
                color: 'success',
                title: 'Approved Appointments',
                text: 'The selected appointment was successfully approved'
            })
        },
        cancelMark() {
            if (this.selected.length == 0)
                return

            this.$vs.dialog({
                type: 'confirm',
                color: 'danger',
                title: `Cancel Appointments`,
                text: 'Are you sure you want to cancel the selected appoitments?',
                accept: this.cancelAccept
            })
        },
        cancelAccept(){
            this.$vs.notify({
                color: 'success',
                title: 'Cancelled Appointments',
                text: 'The selected appointment was successfully cancelled'
            })
        },
        deleteData (id) {
            this.$store.dispatch('appointment/removeItem', id).catch(err => { console.error(err) })
        },
        getStatusColor (status) {
            if (status === 'reserved') return 'success'
            if (status === 'pending')   return 'warning'
            if (status === 'cancelled')  return 'danger'
            return 'primary'
        }
    },
    created () {
        if (!moduleAppointment.isRegistered) {
            this.$store.registerModule('appointment', moduleAppointment)
            moduleAppointment.isRegistered = true
        }
        
    },
    mounted () {
        this.isMounted = true
        this.$store.dispatch('appointment/fetchAppointments',this.$route.meta.status)
    }
}
</script>

<style lang="scss">
#data-list-list-view {
    .vs-con-table {
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
