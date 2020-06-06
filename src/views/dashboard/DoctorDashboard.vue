<template>
    <div>
        <div class="vx-row">
            <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
                <statistics-card-line
                icon="PlusCircleIcon"
                :statistic="reserved | k_formatter"
                statisticTitle="Reserved"
                type="area" />
            </div>

            <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
                <statistics-card-line
                icon="ClockIcon"
                :statistic="pending | k_formatter"
                statisticTitle="Pending"
                color="success"
                type="area" />
            </div>

            <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
                <statistics-card-line
                icon="BookmarkIcon"
                :statistic="booked | k_formatter"
                statisticTitle="Booked"
                color="danger"
                type="area" />
            </div>
            <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
                <statistics-card-line
                icon="XCircleIcon"
                :statistic="cancelled | k_formatter"
                statisticTitle="Cancelled"
                color="warning"
                type="area" />
            </div>
        </div>

        <div class="vx-row">

            <!-- LINE CHART -->
            <div class="vx-col w-full mb-base">
                <vx-card title="Revenue">
                    <template slot="actions">
                        <feather-icon icon="SettingsIcon" svgClasses="w-6 h-6 text-grey"></feather-icon>
                    </template>
                    <div slot="no-body" class="p-6 pb-0">
                        <div class="flex" v-if="revenue.this_month">
                            <div class="mr-6">
                                <p class="mb-1 font-semibold">This Month</p>
                                <p class="text-3xl text-success"><sup class="text-base mr-1">P</sup>{{ revenue.this_month.toLocaleString() }}</p>
                            </div>
                            <div>
                                <p class="mb-1 font-semibold">Last Month</p>
                                <p class="text-3xl"><sup class="text-base mr-1">P</sup>{{ revenue.last_month.toLocaleString() }}</p>
                            </div>
                        </div>
                        <vue-apex-charts
                        type="line"
                        height="266"
                        :options="revenueComparisonLine.chartOptions"
                        :series="revenue.series" />
                    </div>
                </vx-card>
            </div>
        </div>
    </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import VueApexCharts from 'vue-apexcharts'
import StatisticsCardLine from '@/components/statistics-cards/StatisticsCardLine.vue'
import ChangeTimeDurationDropdown from '@/components/ChangeTimeDurationDropdown.vue'
import axios from '@/axios.js'

export default{
    components: {
        VueApexCharts,
        StatisticsCardLine,
        VuePerfectScrollbar,
        ChangeTimeDurationDropdown
    },
    data () {
        return {
            reserved: 0,
            pending: 0,
            booked: 0,
            cancelled: 0,
            revenue: {},

            settings: { 
                maxScrollbarLength: 60,
                wheelSpeed: .60
            },
            revenueComparisonLine: {
                chartOptions: {
                    chart: {
                        toolbar: { show: false },
                        dropShadow: {
                            enabled: true,
                            top: 5,
                            left: 0,
                            blur: 4,
                            opacity: 0.10
                        }
                    },
                    stroke: {
                        curve: 'smooth',
                        dashArray: [0, 8],
                        width: [4, 2]
                    },
                    grid: {
                        borderColor: '#e7e7e7'
                    },
                    legend: {
                        show: false
                    },
                    colors: ['#F97794', '#b8c2cc'],
                    fill: {
                        type: 'gradient',
                        gradient: {
                            shade: 'dark',
                            inverseColors: false,
                            gradientToColors: ['#7367F0', '#b8c2cc'],
                            shadeIntensity: 1,
                            type: 'horizontal',
                            opacityFrom: 1,
                            opacityTo: 1,
                            stops: [0, 100, 100, 100]
                        }
                    },
                    markers: {
                        size: 0,
                        hover: {
                            size: 5
                        }
                    },
                    xaxis: {
                        labels: {
                            style: {
                                cssClass: 'text-grey fill-current'
                            }
                        },
                        axisTicks: {
                            show: false
                        },
                        categories: ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'],
                        axisBorder: {
                            show: false
                        }
                    },
                    yaxis: {
                        tickAmount: 5,
                        labels: {
                            style: {
                                cssClass: 'text-grey fill-current'
                            },
                            formatter (val) {
                                return val > 999 ? `${(val / 1000).toFixed(1)}k` : val
                            }
                        }
                    },
                    tooltip: {
                        x: { show: false }
                    }
                }
            },
        }
    },
    computed: {
        scrollbarTag () { return this.$store.getters.scrollbarTag }
    },
    mounted () {
    },
    created () {
        axios.get('/api/dashboard').then((response) => {
            this.reserved = response.data.appointments.reserved
            this.pending = response.data.appointments.pending
            this.booked = response.data.appointments.booked
            this.cancelled = response.data.appointments.cancelled

            this.revenue = response.data.revenue
        })
    }
}
</script>

<style lang="scss">
.chat-card-log {
    height: 400px;

    .chat-sent-msg {
        background-color: #f2f4f7 !important;
    }
}
</style>
