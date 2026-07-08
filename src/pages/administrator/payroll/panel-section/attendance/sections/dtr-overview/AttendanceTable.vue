<template>
  <!-- KPI Summary Cards -->
  <div class="row q-gutter-md q-mb-md kpi-row">
    <div class="kpi-card kpi-hours col">
      <div class="kpi-icon-wrap"><q-icon name="schedule" size="1.6rem" /></div>
      <div class="kpi-body">
        <div class="kpi-value">{{ kpiStats.totalHours }}h {{ kpiStats.totalMinutes }}m</div>
        <div class="kpi-label">Total Hours Rendered</div>
      </div>
    </div>
    <div class="kpi-card kpi-late col">
      <div class="kpi-icon-wrap"><q-icon name="running_with_errors" size="1.6rem" /></div>
      <div class="kpi-body">
        <div class="kpi-value">{{ kpiStats.lateCount }}</div>
        <div class="kpi-label">Late Arrivals</div>
      </div>
    </div>
    <div class="kpi-card kpi-undertime col">
      <div class="kpi-icon-wrap"><q-icon name="timelapse" size="1.6rem" /></div>
      <div class="kpi-body">
        <div class="kpi-value">{{ kpiStats.undertimeCount }}</div>
        <div class="kpi-label">Undertime Incidents</div>
      </div>
    </div>
    <div class="kpi-card kpi-pending col">
      <div class="kpi-icon-wrap"><q-icon name="pending_actions" size="1.6rem" /></div>
      <div class="kpi-body">
        <div class="kpi-value">{{ kpiStats.pendingOT }}</div>
        <div class="kpi-label">Pending OT Logs</div>
      </div>
    </div>
  </div>

  <div class="row justify-between q-my-md" align="right">
    <div class="row q-gutter-md">
      <div>
        <AddDTRButton @created="reloadTableData" />
      </div>
      <!-- <div>
        <OvertimeButton />
      </div> -->
    </div>
    <q-input
      v-model="filter"
      outlined
      dense
      flat
      label="Search"
      debounce="300"
      style="width: 300px"
    />
  </div>
  <div>
    <!-- Skeletal Loading Table -->
    <div v-if="loading" class="q-pa-sm">
      <q-markup-table flat class="user-card">
        <thead>
          <tr>
            <th v-for="col in dtrColumns" :key="col.name" class="text-center">
              <q-skeleton type="text" width="60%" class="q-mx-auto" />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="n in 5" :key="n">
            <td v-for="col in dtrColumns" :key="col.name" class="text-center">
              <q-skeleton type="text" width="60%" class="q-mx-auto" />
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>

    <q-table
      v-else
      :rows="dtrRows"
      :columns="dtrColumns"
      row-key="time_in"
      v-model:pagination="pagination"
      :rows-per-page-options="[3, 5, 10, 0]"
      :filter="filter"
      @request="handleRequest"
      :row-class="(row) => helpers.isLateArrival(row.time_in, row.schedule_in) ? 'dtr-late-row' : ''"
    >
      <template v-slot:body-cell-position="props">
        <q-td :props="props">
          <q-chip
            outline
            square
            :text-color="
              helpers.getBadgePositionColor(props.row.employee?.position)
            "
            :color="helpers.getBadgePositionColor(props.row.employee?.position)"
            class="q-ma-xs"
            size="sm"
          >
            {{ props.row.employee?.position || "N/A" }}
          </q-chip>
        </q-td>
      </template>

      <template v-slot:body-cell-where_in="props">
        <q-td :props="props" class="cursor-pointer">
          <span>
            {{ props.row.device_in_reference_name || "N/A" }}
            <q-tooltip class="bg-blue-grey-8">Edit Where IN</q-tooltip>
          </span>
          <q-popup-edit
            v-model="props.row.device_in_reference_name"
            @update:model-value="(val) => updateDTRWhereIN(props.row, val)"
            v-slot="scope"
          >
            <div class="q-pa-md" style="min-width: 300px; max-width: 400px">
              <div class="text-h6 text-primary text-center q-mb-sm">
                Edit Where IN
              </div>

              <div class="text-subtitle2 q-mb-sm">
                Name: {{ helpers.formatFullname(props.row.employee) }}
              </div>

              <q-select
                v-model="scope.value"
                :options="branchWithWarehousesOptions"
                autofucos
                option-label="label"
                option-value="value"
                emit-value
                map-options
                outlined
                dense
                counter
                behavior="menu"
                :model-value="scope.value"
                @update:model-value="scope.value = $event"
                @keyup.enter="scope.set"
              />
              <div class="row justify-end q-mt-md">
                <q-btn
                  flat
                  label="Close"
                  color="primary"
                  @click="scope.cancel"
                />
                <q-btn flat label="Save" color="primary" @click="scope.set" />
              </div>
            </div>
          </q-popup-edit>
        </q-td>
      </template>

      <template v-slot:body-cell-where_out="props">
        <q-td :props="props" class="cursor-pointer">
          <span>
            {{ props.row.device_out_reference_name || "N/A" }}
            <q-tooltip>Edit Where OUT</q-tooltip>
          </span>

          <q-popup-edit
            v-model="props.row.device_out_reference_name"
            @update:model-value="(val) => updateDTRWhereOUT(props.row, val)"
            v-slot="scope"
          >
            <div class="q-pa-md" style="min-width: 300px; max-width: 400px">
              <div class="text-h6 text-primary text-center q-mb-sm">
                Edit Where OUT
              </div>

              <div class="text-subtitle2 q-mb-sm">
                Name: {{ helpers.formatFullname(props.row.employee) }}
              </div>

              <q-select
                v-model="scope.value"
                :options="branchWithWarehousesOptions"
                autofucos
                option-label="label"
                option-value="value"
                emit-value
                map-options
                outlined
                dense
                counter
                behavior="menu"
                :model-value="scope.value"
                @update:model-value="scope.value = $event"
                @keyup.enter="scope.set"
              />
              <div class="row justify-end q-mt-md">
                <q-btn
                  flat
                  label="Close"
                  color="primary"
                  @click="scope.cancel"
                />
                <q-btn flat label="Save" color="primary" @click="scope.set" />
              </div>
            </div>
          </q-popup-edit>
        </q-td>
      </template>

      <template v-slot:body-cell-shift_status="props">
        <q-td :props="props" class="cursor-pointer">
          <q-chip
            :color="getShiftStatusChip(props.row.shift_status).color"
            text-color="white"
            dense
          >
            {{ getShiftStatusChip(props.row.shift_status).label }}
            <q-tooltip> Edit Shift Status </q-tooltip>
          </q-chip>

          <q-popup-edit
            v-model="props.row.shiftStatus"
            @update:model-value="(val) => updateDTRShiftStatus(props.row, val)"
            v-slot="scope"
          >
            <div class="q-pa-md" style="min-width: 300px; max-width: 400px">
              <div class="text-h6 text-primary text-center q-mb-sm">
                Edit Shift Status
              </div>

              <div class="text-subtitle2 q-mb-sm">
                Name: {{ helpers.formatFullname(props.row.employee) }}
              </div>

              <q-select
                v-model="scope.value"
                :options="[
                  { label: 'Regular Day', value: 'Regular Day' },
                  { label: 'Half Day', value: 'Half Day' },
                ]"
                option-label="label"
                option-value="value"
                emit-value
                map-options
                autofocus
                outlined
                dense
                counter
                behavior="menu"
                :model-value="scope.value"
                @keyup.enter="scope.set"
              />
              <div class="row justify-end q-mt-md">
                <q-btn
                  flat
                  label="Close"
                  color="primary"
                  @click="scope.cancel"
                />
                <q-btn flat label="Save" color="primary" @click="scope.set" />
              </div>
            </div>
          </q-popup-edit>
        </q-td>
      </template>

      <template v-slot:body-cell-date_in="props">
        <q-td :props="props" class="cursor-pointer">
          <span v-if="props.row.time_in">
            {{ helpers.formatDate(props.row.time_in) }}
            <q-tooltip class="bg-blue-grey-8">Edit Date IN</q-tooltip>
          </span>
          <span v-else> - - - </span>

          <q-popup-edit
            v-model="props.row.time_in"
            v-slot="scope"
            persistent
            @update:model-value="
              (newValue) => updateDTRTimeINDateOnly(props.row, newValue, 'date')
            "
          >
            <div style="min-width: 300px; max-width: 400px">
              <div class="text-h6 text-primary text-center q-mb-sm">
                Edit Date IN
              </div>

              <div class="text-subtitle2 q-mb-sm">
                Name: {{ helpers.formatFullname(props.row.employee) }}
              </div>
              <q-date
                v-model="scope.value"
                mask="MMM. DD, YYYY, hh:mm A"
                today-btn
              />
              <div class="row justify-end q-mt-md">
                <q-btn
                  flat
                  label="Close"
                  color="primary"
                  @click="scope.cancel"
                />
                <q-btn flat label="Save" color="primary" @click="scope.set" />
              </div>
            </div>
          </q-popup-edit>
        </q-td>
      </template>

      <template v-slot:body-cell-date_out="props">
        <q-td :props="props" class="cursor-pointer">
          <span v-if="props.row.time_out">
            {{ helpers.formatDate(props.row.time_out) }}
            <q-tooltip class="bg-blue-grey-8">Edit Date OUT</q-tooltip>
          </span>
          <span v-else> - - - </span>

          <q-popup-edit
            v-model="props.row.time_out"
            v-slot="scope"
            buttons
            persistent
            @update:model-value="
              (newValue) =>
                updateDTRTimeOUTDateOnly(props.row, newValue, 'date')
            "
          >
            <div style="min-width: 300px; max-width: 400px">
              <div class="text-h6 text-primary text-center q-mb-sm">
                Edit Date OUT
              </div>
              <div class="text-subtitle2 q-mb-sm">
                Name: {{ helpers.formatFullname(props.row.employee) }}
              </div>
              <q-date
                v-model="scope.value"
                mask="MMM. DD, YYYY, hh:mm A"
                today-btn
              />
              <div class="row justify-end q-mt-md">
                <q-btn
                  flat
                  label="Close"
                  color="primary"
                  @click="scope.cancel"
                />
                <q-btn flat label="Save" color="primary" @click="scope.set" />
              </div>
            </div>
          </q-popup-edit>
        </q-td>
      </template>

      <template v-slot:body-cell-time_in="props">
        <q-td :props="props">
          <div class="row items-center q-gutter-x-xs" v-if="props.row.time_in">
            <q-badge outline color="positive" class="time-badge">
              <q-icon name="login" size="xs" class="q-mr-2xs" />
              IN &nbsp;{{ helpers.formatTime(props.row.time_in) }}
              <q-tooltip class="bg-blue-grey-8">Edit Time IN</q-tooltip>
            </q-badge>
            <!-- Late Arrival indicator -->
            <q-chip
              v-if="helpers.isLateArrival(props.row.time_in, props.row.schedule_in)"
              dense
              color="amber-2"
              text-color="amber-9"
              icon="running_with_errors"
              size="xs"
              class="late-chip"
            >
              {{ helpers.getLatenessMinutes(props.row.time_in, props.row.schedule_in) }}m late
            </q-chip>
          </div>
          <span v-else> - - - </span>

          <q-popup-edit
            v-model="props.row.time_in"
            v-slot="scope"
            persistent
            @save="
              (newValue) => updateDTRTimeINOnly(props.row, newValue, 'time')
            "
          >
            <div>
              <div class="text-h6 text-primary text-center q-mb-sm">
                Edit Time IN
              </div>

              <div>Name: {{ helpers.formatFullname(props.row.employee) }}</div>

              <q-input
                v-model="scope.value"
                type="time"
                filled
                hint="(e.g. 01:00 AM)"
              />
              <div class="row justify-end q-mt-md">
                <q-btn
                  flat
                  label="Close"
                  color="primary"
                  @click="scope.cancel"
                />
                <q-btn flat label="Save" color="primary" @click="scope.set" />
              </div>
            </div>
          </q-popup-edit>
        </q-td>
      </template>

      <template v-slot:body-cell-time_out="props">
        <q-td :props="props">
          <q-badge v-if="props.row.time_out" outline color="purple-12" class="time-badge">
            <q-icon name="logout" size="xs" class="q-mr-2xs" />
            OUT &nbsp;{{ helpers.formatTime(props.row.time_out) }}
            <q-tooltip class="bg-blue-grey-8">Edit Time OUT</q-tooltip>
          </q-badge>
          <!-- Incomplete DTR pill -->
          <q-chip
            v-else-if="helpers.isIncompleteDTR(props.row)"
            dense
            color="red-1"
            text-color="red-12"
            icon="warning"
            size="sm"
            class="incomplete-dtr-chip"
          >
            INCOMPLETE
          </q-chip>
          <span v-else> - - - </span>

          <q-popup-edit
            v-model="props.row.time_out"
            v-slot="scope"
            persistent
            @save="
              (newValue) => updateDTRTimeOutOnly(props.row, newValue, 'time')
            "
          >
            <div>
              <div class="text-h6 text-primary text-center q-mb-sm">
                Edit Time OUT
              </div>

              <div>Name: {{ helpers.formatFullname(props.row.employee) }}</div>
              <q-input
                v-model="scope.value"
                type="time"
                filled
                hint="(e.g 01:00 AM)"
              />
              <div class="row justify-end q-mt-md">
                <q-btn
                  flat
                  label="Close"
                  color="primary"
                  @click="scope.cancel"
                />
                <q-btn flat label="Save" color="primary" @click="scope.set" />
              </div>
            </div>
          </q-popup-edit>
        </q-td>
      </template>

      <template v-slot:body-cell-lunch_break_start="props">
        <q-td :props="props">
          <q-badge v-if="props.row.lunch_break_start" outline color="amber-7">
            {{ helpers.formatTime(props.row.lunch_break_start) }}
            <q-tooltip class="bg-blue-grey-8">Edit lunch break start</q-tooltip>
          </q-badge>
          <span v-else> - - - </span>

          <q-popup-edit
            v-model="props.row.lunch_break_start"
            v-slot="scope"
            persistent
            @save="
              (newValue) =>
                updateDTRLunchBreakStart(props.row, newValue, 'time')
            "
          >
            <div>
              <div class="text-h6 text-primary text-center q-mb-sm">
                Edit lunch break start
              </div>

              <div>Name: {{ helpers.formatFullname(props.row.employee) }}</div>
              <q-input
                v-model="scope.value"
                type="time"
                filled
                hint="(e.g 01:00 AM)"
              />
              <div class="row justify-end q-mt-md">
                <q-btn
                  flat
                  label="Close"
                  color="primary"
                  @click="scope.cancel"
                />

                <q-btn flat label="Save" color="primary" @click="scope.set" />
              </div>
            </div>
          </q-popup-edit>
        </q-td>
      </template>

      <template v-slot:body-cell-lunch_break_end="props">
        <q-td :props="props">
          <q-badge v-if="props.row.lunch_break_end" outline color="amber-4">
            {{ helpers.formatTime(props.row.lunch_break_end) }}
            <q-tooltip class="bg-blue-grey-8">Edit lunch break end</q-tooltip>
          </q-badge>
          <span v-else> - - - </span>

          <q-popup-edit
            v-model="props.row.lunch_break_end"
            v-slot="scope"
            persistent
            @save="
              (newValue) => updateDTRLunchBreakEnd(props.row, newValue, 'time')
            "
          >
            <div>
              <div class="text-h6 text-primary text-center q-mb-sm">
                Edit lunch break end
              </div>
              <div class="text-subtitle2 q-mb-sm">
                Name: {{ helpers.formatFullname(props.row.employee) }}
              </div>
              <q-input
                v-model="scope.value"
                type="time"
                filled
                hint="(e.g 01:00 AM)"
              />
              <div class="row justify-end q-mt-md">
                <q-btn
                  flat
                  label="Cancel"
                  color="primary"
                  @click="scope.cancel"
                />
                <q-btn flat label="Save" color="primary" @click="scope.set" />
              </div>
            </div>
          </q-popup-edit>
        </q-td>
      </template>

      <template v-slot:body-cell-break_start="props">
        <q-td :props="props">
          <q-badge v-if="props.row.break_start" outline color="blue-7">
            {{ helpers.formatTime(props.row.break_start) }}
          </q-badge>
          <span v-else> - - - </span>

          <q-popup-edit
            v-model="props.row.break_start"
            v-slot="scope"
            persistent
            @save="
              (newValue) => updateDTRBreakStart(props.row, newValue, 'time')
            "
          >
            <div>
              <div class="text-h6 text-primary text-center q-mb-sm">
                Edit break start
              </div>
              <div>Name: {{ helpers.formatFullname(props.row.employee) }}</div>
              <q-input
                v-model="scope.value"
                type="time"
                filled
                hint="(e.g 01:00 AM)"
              />
              <div class="row justify-end q-mt-md">
                <q-btn
                  flat
                  label="Cancel"
                  color="primary"
                  @click="scope.cancel"
                />
                <q-btn flat label="Save" color="primary" @click="scope.set" />
              </div>
            </div>
          </q-popup-edit>
        </q-td>
      </template>

      <template v-slot:body-cell-break_end="props">
        <q-td :props="props">
          <q-badge v-if="props.row.break_end" outline color="blue-4">
            {{ helpers.formatTime(props.row.break_end) }}
            <q-tooltip class="bg-blue-grey-8">Edit break end</q-tooltip>
          </q-badge>
          <span v-else> - - - </span>

          <q-popup-edit
            v-model="props.row.break_end"
            v-slot="scope"
            persistent
            @save="(newValue) => updateDTRBreakEnd(props.row, newValue, 'time')"
          >
            <div>
              <div class="text-h6 text-primary text-center q-mb-sm">
                Edit break end
              </div>
              <div class="text-subtitle2 q-mb-sm">
                Name: {{ helpers.formatFullname(props.row.employee) }}
              </div>
              <q-input
                v-model="scope.value"
                type="time"
                filled
                hint="(e.g 01:00 AM)"
              />
              <div class="row justify-end q-mt-md">
                <q-btn
                  flat
                  label="Cancel"
                  color="primary"
                  @click="scope.cancel"
                />
                <q-btn flat label="Save" color="primary" @click="scope.set" />
              </div>
            </div>
          </q-popup-edit>
        </q-td>
      </template>

      <template v-slot:body-cell-break="props">
        <q-td :props="props">
          <template v-if="props.row.break_start && props.row.break_end">
            <q-badge
              outline
              :color="
                helpers.getBreakColor(
                  props.row.break_start,
                  props.row.break_end
                )
              "
              class="q-ma-xs"
              size="md"
            >
              <q-icon
                :name="
                  helpers.getBreakHoursIcon(
                    props.row.break_start,
                    props.row.break_end
                  )
                "
                size="xs"
                class="q-mr-xs"
              />
              {{
                `${
                  helpers.calculateTotalWorkingHours(
                    props.row.break_start,
                    props.row.break_end
                  ).hours
                } Hrs : ${
                  helpers.calculateTotalWorkingHours(
                    props.row.break_start,
                    props.row.break_end
                  ).minutes
                } Min`
              }}
            </q-badge>
          </template>
          <span v-else> - - - </span>
        </q-td>
      </template>

      <template v-slot:body-cell-lunch_break="props">
        <q-td :props="props">
          <template
            v-if="props.row.lunch_break_start && props.row.lunch_break_end"
          >
            <q-badge
              outline
              :color="
                helpers.getLunchBreakColor(
                  props.row.lunch_break_start,
                  props.row.lunch_break_end
                )
              "
              class="q-ma-xs"
              size="md"
            >
              <q-icon
                :name="
                  helpers.getLunchBreakIcon(
                    props.row.lunch_break_start,
                    props.row.lunch_break_end
                  )
                "
                size="xs"
                class="q-mr-xs"
              />
              {{
                `${
                  helpers.calculateTotalWorkingHours(
                    props.row.lunch_break_start,
                    props.row.lunch_break_end
                  ).hours
                } Hrs : ${
                  helpers.calculateTotalWorkingHours(
                    props.row.lunch_break_start,
                    props.row.lunch_break_end
                  ).minutes
                } Min`
              }}
            </q-badge>
          </template>
          <span v-else> - - - </span>
        </q-td>
      </template>

      <template v-slot:body-cell-total_working_hours="props">
        <q-td :props="props">
          <template v-if="props.row.time_in && props.row.time_out">
            <q-badge
              outline
              :color="
                helpers.getWorkHoursColor(props.row.time_in, props.row.time_out)
              "
              class="q-ma-xs"
              size="md"
            >
              <q-icon
                :name="
                  helpers.getWorkHoursIcon(
                    props.row.time_in,
                    props.row.time_out
                  )
                "
                size="xs"
                class="q-mr-xs"
              />
              {{
                `${
                  helpers.calculateTotalWorkingHours(
                    props.row.time_in,
                    props.row.time_out
                  ).hours
                } Hrs : ${
                  helpers.calculateTotalWorkingHours(
                    props.row.time_in,
                    props.row.time_out
                  ).minutes
                } Min`
              }}
            </q-badge>
          </template>
          <span v-else> - - - </span>
        </q-td>
      </template>

      <template v-slot:body-cell-overtime_start="props">
        <q-td :props="props">
          <!-- Display value -->
          <q-badge v-if="props.row.overtime_start" outline color="black">
            {{ props.row.overtime_start }}
            <q-tooltip class="bg-blue-grey-8"> Edit Overtime Start </q-tooltip>
          </q-badge>
          <span v-else> - - - </span>

          <q-popup-edit
            v-model="props.row.overtime_start"
            v-slot="scope"
            persistent
            @save="(newVal) => updateDTROvertimeStart(props.row, newVal)"
          >
            <div>
              <div class="text-h6 text-primary text-center q-mb-sm">
                Edit Overtime Start
              </div>
              <div class="text-subtitle2 q-mb-sm">
                Name: {{ helpers.formatFullname(props.row.employee) }}
              </div>
              <q-input
                v-model="scope.value"
                type="datetime-local"
                filled
                :model-value="convertDisplayToInput(props.row.overtime_start)"
                @update:model-value="scope.value = $event"
                hint="Select date & time"
              />
              <div class="row justify-end q-mt-md">
                <q-btn
                  flat
                  label="Cancel"
                  color="primary"
                  @click="scope.cancel"
                />
                <q-btn flat label="Save" color="primary" @click="scope.set" />
              </div>
            </div>
          </q-popup-edit>
        </q-td>
      </template>

      <template v-slot:body-cell-overtime_end="props">
        <q-td :props="props">
          <!-- Display value -->
          <q-badge v-if="props.row.overtime_end" outline color="black">
            {{ props.row.overtime_end }}
            <q-tooltip class="bg-blue-grey-8"> Edit Overtime End </q-tooltip>
          </q-badge>
          <span v-else> - - - </span>

          <!-- Popup editor -->
          <q-popup-edit
            v-model="props.row.overtime_end"
            v-slot="scope"
            persistent
            @save="(newVal) => updateDTROvertimeEnd(props.row, newVal)"
          >
            <div>
              <div class="text-h6 text-primary text-center q-mb-sm">
                Edit Overtime End
              </div>
              <div class="text-subtitle2 q-mb-sm">
                Name: {{ helpers.formatFullname(props.row.employee) }}
              </div>
              <q-input
                v-model="scope.value"
                type="datetime-local"
                filled
                :model-value="convertDisplayToInput(props.row.overtime_end)"
                @update:model-value="scope.value = $event"
                hint="Select date & time"
              />
              <div class="row justify-end q-mt-md">
                <q-btn
                  flat
                  label="Cancel"
                  color="primary"
                  @click="scope.cancel"
                />
                <q-btn flat label="Save" color="primary" @click="scope.set" />
              </div>
            </div>
          </q-popup-edit>
        </q-td>
      </template>

      <template v-slot:body-cell-ot_status="props">
        <q-td :props="props" class="row items-center">
          <!-- APPROVED -->
          <q-chip
            v-if="props.row.ot_status === 'approved'"
            size="sm"
            color="green-1"
            text-color="green-8"
            rounded
            icon="check_circle"
            :label="helpers.capitalize(props.row.ot_status)"
          />

          <!-- DECLINED -->
          <q-chip
            v-else-if="props.row.ot_status === 'declined'"
            size="sm"
            color="red-2"
            text-color="red-14"
            rounded
            icon="cancel"
            :label="helpers.capitalize(props.row.ot_status)"
          />

          <!-- PENDING — unified approve | decline pill -->
          <div
            v-else-if="props.row.ot_status === 'pending'"
            class="ot-action-pill"
          >
            <DeclineOTButton :decline="props.row" class="ot-decline-wrap" />
            <ApproveOTButton :approve="props.row" class="ot-approve-wrap" />
          </div>

          <!-- NO STATUS OR OTHER VALUES -->
          <span v-else> - - - </span>

          <!-- EDIT ICON (only visible if not pending) -->
          <q-popup-edit
            v-if="props.row.ot_status !== 'pending'"
            v-model="props.row.ot_status"
            @update:model-value="(val) => updateDTROTStatus(props.row, val)"
          >
            <template v-slot="scope">
              <!-- Trigger button -->
              <q-btn
                flat
                round
                dense
                size="sm"
                icon="edit"
                color="primary"
                @click.stop="scope.set"
                class="q-ml-sm"
              />

              <!-- Popup content -->
              <div class="q-pa-md" style="min-width: 300px; max-width: 400px">
                <div class="text-h6 text-primary text-center q-mb-sm">
                  Edit OT Status
                </div>

                <div class="text-subtitle2 q-mb-sm">
                  Name: {{ helpers.formatFullname(props.row.employee) }}
                </div>

                <q-select
                  v-model="scope.value"
                  :options="[
                    { label: 'Approved', value: 'approved' },
                    { label: 'Declined', value: 'declined' },
                  ]"
                  option-label="label"
                  option-value="value"
                  emit-value
                  map-options
                  autofocus
                  outlined
                  dense
                  counter
                  behavior="menu"
                  @keyup.enter="scope.set"
                />

                <div class="row justify-end q-mt-md">
                  <q-btn
                    flat
                    label="Close"
                    color="primary"
                    @click="scope.cancel"
                  />
                  <q-btn flat label="Save" color="primary" @click="scope.set" />
                </div>
              </div>
            </template>
          </q-popup-edit>
        </q-td>
      </template>

      <template v-slot:body-cell-overtime_reason="props">
        <q-td :props="props">
          <span v-if="props.row.overtime_reason">
            {{ helpers.truncateText(props.row.overtime_reason, 15) }}
            <q-tooltip
              v-if="props.row.overtime_reason.length > 15"
              class="bg-blue-grey-10 text-white text-subtitle1"
              :offset="[10, 10]"
            >
              {{ props.row.overtime_reason }}
            </q-tooltip>
          </span>
          <span v-else> - - - </span>

          <q-popup-edit
            v-model="props.row.overtime_reason"
            @update:model-value="
              (val) => updateDTROvertimeReasons(props.row, val)
            "
            v-slot="scope"
          >
            <div class="q-pa-md" style="min-width: 300px; max-width: 400px">
              <div class="text-h6 text-primary text-center q-mb-sm">
                Edit Overtime Reason
              </div>
              <div class="text-subtitle2 q-mb-sm">
                Name: {{ helpers.formatFullname(props.row.employee) }}
              </div>

              <q-input
                v-model="scope.value"
                filled
                :model-value="scope.value"
                @keyup.enter="scope.set"
                hint="Enter Overtime Reason"
              />
              <div class="row justify-end q-mt-md">
                <q-btn
                  flat
                  label="Close"
                  color="primary"
                  @click="scope.cancel"
                />
                <q-btn flat label="Save" color="primary" @click="scope.set" />
              </div>
            </div>
          </q-popup-edit>
        </q-td>
      </template>

      <template v-slot:body-cell-declined_reason="props">
        <q-td :props="props">
          <span v-if="props.row.declined_reason">
            {{ helpers.truncateText(props.row.declined_reason, 15) }}
            <q-tooltip
              v-if="props.row.declined_reason.length > 15"
              class="bg-blue-grey-10 text-white text-subtitle1"
              :offset="[10, 10]"
            >
              {{ props.row.declined_reason }}
            </q-tooltip>
          </span>
          <span v-else> - - - </span>

          <q-popup-edit
            v-model="props.row.declined_reason"
            @update:model-value="
              (val) => updateDTRDeclineReasons(props.row, val)
            "
            v-slot="scope"
          >
            <div class="q-pa-md" style="min-width: 300px; max-width: 400px">
              <div class="text-h6 text-primary text-center q-mb-sm">
                Edit Overtime Decline Reason
              </div>
              <div class="text-subtitle2 q-mb-sm">
                Name: {{ helpers.formatFullname(props.row.employee) }}
              </div>

              <q-input
                v-model="scope.value"
                filled
                :model-value="scope.value"
                @keyup.enter="scope.set"
                hint="Enter Overtime Decline Reason"
              />
              <div class="row justify-end q-mt-md">
                <q-btn
                  flat
                  label="Close"
                  color="primary"
                  @click="scope.cancel"
                />
                <q-btn flat label="Save" color="primary" @click="scope.set" />
              </div>
            </div>
          </q-popup-edit>
        </q-td>
      </template>

      <template v-slot:body-cell-approved_by="props">
        <q-td :props="props">
          <span v-if="props.row.approvedBy">
            {{ helpers.formatFullname(props.row.approvedBy) }}
          </span>
          <span v-else>- - -</span>

          <q-popup-edit
            v-model="props.row.approvedBy"
            v-slot="scope"
            persistent
            @save="(val) => updateDTROTApprovedBy(props.row, val)"
          >
            <div>
              <div class="text-h6 text-primary text-center q-mb-sm">
                Edit OT Approved By
              </div>
              <div class="text-subtitle2 q-mb-sm">
                Name: {{ helpers.formatFullname(props.row.employee) }}
              </div>
              <q-input
                v-model="searchKeyword"
                debounce="400"
                placeholder="Search employee"
                clearable
                outlined
                dense
                @update:model-value="search"
              >
                <template v-slot:append>
                  <q-icon v-if="!searchLoading" name="search" />
                  <q-spinner v-else color="primary" size="sm" />
                </template>
              </q-input>

              <q-list separator v-if="searchKeyword">
                <q-item
                  v-for="employee in employees"
                  :key="employee.id"
                  clickable
                  @click="() => selectEmployee(employee, scope)"
                >
                  <q-item-section>
                    {{
                      `${employee.firstname} ${
                        employee.middlename
                          ? employee.middlename.charAt(0) + "."
                          : ""
                      } ${employee.lastname}`
                    }}
                  </q-item-section>
                </q-item>

                <q-item v-if="!employees.length">
                  <q-item-section class="text-grey-7">
                    No employee found
                  </q-item-section>
                </q-item>
              </q-list>
              <div class="row justify-end q-mt-md">
                <q-btn
                  flat
                  label="Close"
                  color="primary"
                  @click="scope.cancel"
                />

                <q-btn flat label="Save" color="primary" @click="scope.set" />
              </div>
            </div>
          </q-popup-edit>
        </q-td>
      </template>

      <template v-slot:body-cell-schedule_in="props">
        <q-td :props="props">
          <div :class="{ 'editable-cell': props.row.schedule_in }">
            {{ props.row.schedule_in || "N/A" }}
            <q-tooltip class="bg-blue-grey-8" :offset="[10, 10]">
              Edit Schedule In
            </q-tooltip>
          </div>

          <q-popup-edit
            @update:model-value="
              (val) => updateEmployeeScheduleIn(props.row, val)
            "
            v-model="props.row.schedule_in"
            v-slot="scope"
          >
            <div>
              <div class="text-h6 text-primary text-center q-mb-sm">
                Edit Schedule In
              </div>
              <div class="text-subtitle2 q-mb-sm">
                Name: {{ helpers.formatFullname(props.row.employee) }}
              </div>
              <q-input
                v-model="scope.value"
                :model-value="scope.value"
                @update:model-value="scope.value = $event"
                dense
                outlined
                autofocus
                mask="##:## AA"
                :rules="[validateTimeFormat]"
                hint="Format: 01:00 AM/PM"
                @keyup.enter="scope.set"
              />
              <div class="row justify-end q-mt-md">
                <q-btn
                  flat
                  label="Cancel"
                  color="primary"
                  @click="scope.cancel"
                />

                <q-btn flat label="Save" color="primary" @click="scope.set" />
              </div>
            </div>
          </q-popup-edit>
        </q-td>
      </template>

      <template v-slot:body-cell-schedule_out="props">
        <q-td :props="props">
          <div :class="{ 'editable-cell': props.row.schedule_out }">
            {{ props.row.schedule_out || "N/A" }}
            <q-tooltip class="bg-blue-grey-8" :offset="[10, 10]">
              Edit Schedule Out
            </q-tooltip>
          </div>

          <q-popup-edit
            @update:model-value="
              (val) => updateEmployeeScheduleOut(props.row, val)
            "
            v-model="props.row.schedule_out"
            v-slot="scope"
          >
            <div>
              <div class="text-h6 text-primary text-center q-mb-sm">
                Edit Schedule Out
              </div>
              <div class="text-subtitle2 q-mb-sm">
                Name: {{ helpers.formatFullname(props.row.employee) }}
              </div>
              <q-input
                v-model="scope.value"
                :model-value="scope.value"
                @update:model-value="scope.value = $event"
                dense
                autofocus
                outlined
                mask="##:## AA"
                :rules="[validateTimeFormat]"
                hint="Format: 01:00 AM/PM"
                @keyup.enter="scope.set"
              />
              <div class="row justify-end q-mt-md">
                <q-btn
                  flat
                  label="Cancel"
                  color="primary"
                  @click="scope.cancel"
                />

                <q-btn flat label="Save" color="primary" @click="scope.set" />
              </div>
            </div>
          </q-popup-edit>
        </q-td>
      </template>

      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <div class="row justify-center q-gutter-x-md">
            <EditDTR :edit="props" />
          </div>
        </q-td>
      </template>


    </q-table>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { date } from "quasar";
import { useDTRStore } from "stores/dtr";
import OvertimeButton from "./OvertimeButton.vue";
import AddDTRButton from "./AddDTRButton.vue";
import EditDTR from "./EditDTR.vue";
import { useEmployeeStore } from "stores/employee";
import DeclineOTButton from "./DeclineOTButton.vue";
import ApproveOTButton from "./ApproveOTButton.vue";
import { useAttendanceHelpers } from "src/composables/attendance/useAttendanceHelpers";

// Initialize attendance helpers
const helpers = useAttendanceHelpers();

const employeeStore = useEmployeeStore();
const employees = computed(() => employeeStore.employees);

// Reactive variables
const pagination = ref({
  page: 1,
  rowsPerPage: 0,
  rowsNumber: 0,
});
const filter = ref("");
const loading = ref(false);
const searchLoading = ref(false);
const searchKeyword = ref("");

const dtrStore = useDTRStore();
const dtrData = computed(() => dtrStore.dtrs);
const branchWithWarehousesList = computed(() => dtrStore.branchWithWarehouses);
const selectedEmployee = ref(null);

const dtrRows = ref([]);

const search = async () => {
  const keyword = searchKeyword.value?.trim();
  if (!keyword) return;

  searchLoading.value = true;
  try {
    await employeeStore.searchEmployee(keyword); // fills employeeStore.employees
  } finally {
    searchLoading.value = false;
  }
};

const selectEmployee = (employee, scope) => {
  selectedEmployee.value = employee;

  // Fill input visually
  const name = `${employee.firstname} ${
    employee.middlename ? employee.middlename.charAt(0) + "." : ""
  } ${employee.lastname}`;
  searchKeyword.value = name;

  // Assign to scope for popup save
  scope.value = employee; // or employee.id if you want just the id

  // Clear employees list in the store
  employeeStore.employees = []; // ✅ resets list
};
// Fetch data on component mount
onMounted(async () => {
  await reloadTableData();
});

const validateTimeFormat = (val) => {
  // Regex to match "HH:MM AM/PM" format.
  // HH: 01-12
  // MM: 00-59
  // AM/PM: AM or PM
  const timeRegex = /^(0[1-9]|1[0-2]):([0-5][0-9]) (AM|PM)$/;
  return (
    timeRegex.test(val) || "Time format must be HH:MM AM/PM (e.g., 01:00 AM)"
  );
};

const updateEmployeeScheduleIn = async (data, val) => {
  /* console.log("updateEmployeeScheduleIn composables", data, val); */

  loading.value = true;
  try {
    const employeeScheduleIn = {
      id: data.id,
      schedule_in: val,
    };
    /* console.log("employeeScheduleIn", employeeScheduleIn); */
    await dtrStore.updateDtrScheduleIn(employeeScheduleIn);
  } catch (error) {
    /* console.log("error", error); */
  } finally {
    loading.value = false;
  }
};

const updateEmployeeScheduleOut = async (data, val) => {
  /* console.log("updateEmployeeScheduleOut composables", data, val); */

  loading.value = true;

  try {
    const employeeScheduleOut = {
      id: data.id,
      schedule_out: val,
    };

    /* console.log("employeeScheduleOut", employeeScheduleOut); */
    await dtrStore.updateDtrSheduleOut(employeeScheduleOut);
  } catch (error) {
    /* console.log(error); */
  } finally {
    loading.value = false;
  }
};

const getBranchWithWarehouses = async () => {
  loading.value = true;
  try {
    const response = await dtrStore.getBranchWithWarehouses();
  } catch (error) {
    /* console.log("error", error); */
  } finally {
    loading.value = false;
  }
};
onMounted(getBranchWithWarehouses);

const branchWithWarehousesOptions = computed(() => {
  return branchWithWarehousesList.value.data.map((list) => ({
    label: list.name,
    value: list.devices[0]?.uuid,
  }));
});

const updateDTRWhereIN = async (data, val) => {
  /* console.log("updateDTRWhereIN composables", data, val); */

  loading.value = true;
  try {
    const dtrWhereIN = {
      id: data.id,
      device_uuid_in: val,
    };

    await dtrStore.updateDTRWhereIN(dtrWhereIN);

    // 🔑 Lookup the device label (name) from your options
    const match = branchWithWarehousesOptions.value.find(
      (opt) => opt.value === val
    );
    if (match) {
      data.device_in_reference_name = match.label; // update the row's display field
    }
  } catch (error) {
    /* console.log("error", error); */
  } finally {
    loading.value = false;
  }
};

const updateDTRWhereOUT = async (data, val) => {
  /* console.log("updateDTRWhereOUT composables", data, val); */

  loading.value = true;
  try {
    const dtrWhereOUT = {
      id: data.id,
      device_uuid_out: val,
    };

    await dtrStore.updateDTRWhereOUT(dtrWhereOUT);

    // 🔑 Lookup the device label (name) from your options
    const match = branchWithWarehousesOptions.value.find(
      (opt) => opt.value === val
    );

    if (match) {
      data.device_out_reference_name = match.label; // update the row's display field
    }
  } catch (error) {
    /* console.log("error", error); */
  } finally {
    loading.value = false;
  }
};

const updateDTRShiftStatus = async (data, val) => {
  /* console.log("updateDTRShiftStatus composables", data, val); */

  loading.value = true;
  try {
    const shiftStatus = {
      id: data.id,
      shift_status: val,
    };

    await dtrStore.updateDTRShiftStatus(shiftStatus);

    // Update the row's display field directly
    data.shift_status = val;
  } catch (error) {
    /* console.log("error", error); */
  } finally {
    loading.value = false;
  }
};

const updateDTRTimeINDateOnly = async (row, newDateTime, type) => {
  /* console.log("updateDTRTimeINDateOnly composables", row, newDateTime, type); */

  // Example: If you want to keep the original time when only date is changed
  let updatedDateTime;
  if (row.time_in && type === "date") {
    const originalDate = new Date(row.time_in);

    // Extract only the date part (ignore the midnight time from q-date)
    const pickedDate = new Date(newDateTime);

    originalDate.setFullYear(pickedDate.getFullYear());
    originalDate.setMonth(pickedDate.getMonth());
    originalDate.setDate(pickedDate.getDate());

    updatedDateTime = originalDate.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    updatedDateTime = updatedDateTime.replace(
      /^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/,
      "$1."
    );
  } else {
    updatedDateTime = newDateTime; // If no original time or type is not date
  }

  // --- Send updatedDateTime to your backend ---
  /* console.log("Updating row with new time_in:", updatedDateTime); */
  // Example API call (replace with your actual API integration)
  loading.value = true;
  try {
    const dtrDateIN = {
      id: row.id,
      time_in: updatedDateTime,
    };

    const response = await dtrStore.updateDTRDateIN(dtrDateIN);
  } catch (error) {
    /* console.log("error", error); */
  } finally {
    loading.value = false;
  }

  // For demonstration, directly update the row (in a real app, this would be done after successful API response)
  row.time_in = updatedDateTime;
};

// const updateDTRTimeOUTDateOnly = async (row, newDateTime, type) => {
//   console.log("updateDTRTimeOUTDateOnly composables", row, newDateTime, type);

//   // Example: If you want to keep the original time when only date is changed
//   let updatedDateTime;
//   if (row.time_out && type === "date") {
//     const originalDate = new Date(row.time_out);

//     // Extract only the date part (ignore the midnight time from q-date)
//     const pickedDate = new Date(newDateTime);

//     originalDate.setFullYear(pickedDate.getFullYear());
//     originalDate.setMonth(pickedDate.getMonth());
//     originalDate.setDate(pickedDate.getDate());

//     updatedDateTime = originalDate.toLocaleString("en-US", {
//       month: "short",
//       day: "numeric",
//       year: "numeric",
//       hour: "numeric",
//       minute: "numeric",
//       hour12: true,
//     });

//     updatedDateTime = updatedDateTime.replace(
//       /^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/,
//       "$1."
//     );
//   } else {
//     updatedDateTime = newDateTime; // If no original time or type is not date
//   }

//   // --- Send updatedDateTime to your backend ---
//   console.log("Updating row with new time_out:", updatedDateTime);
//   loading.value = true;
//   try {
//     const dtrDateOUT = {
//       id: row.id,
//       time_out: updatedDateTime,
//     };

//     const response = await dtrStore.updateDTRDateOUT(dtrDateOUT);
//   } catch (error) {
//     console.log("error", error);
//   } finally {
//     loading.value = false;
//   }

//   row.time_out = updatedDateTime;
// };

const updateDTRTimeOUTDateOnly = async (row, newDateTime, type) => {
  /* console.log("updateDTRTimeOUTDateOnly composables", row, newDateTime, type); */

  let updatedDateTime;
  if (row.time_out && type === "date") {
    const originalDate = new Date(row.time_out);
    const pickedDate = new Date(newDateTime);

    // Replace only the date, keep the original time
    originalDate.setFullYear(pickedDate.getFullYear());
    originalDate.setMonth(pickedDate.getMonth());
    originalDate.setDate(pickedDate.getDate());

    updatedDateTime = originalDate.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    updatedDateTime = updatedDateTime.replace(
      /^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/,
      "$1."
    );
  } else {
    updatedDateTime = newDateTime;
  }

  /* console.log("Updating row with new time_out:", updatedDateTime); */

  loading.value = true;
  try {
    await dtrStore.updateDTRDateOUT({ id: row.id, time_out: updatedDateTime });
    row.time_out = updatedDateTime;
  } catch (error) {
    /* console.log("error", error); */
  } finally {
    loading.value = false;
  }
};

const updateDTRTimeINOnly = async (row, newTime, type) => {
  /* console.log("updateDTRTimeINOnly composables", row, newTime, type); */

  let updatedDateTime;

  if (row.time_in && type === "time") {
    // Extract only the "Jul. 21, 2025" part (date only, no old time)
    const datePart = row.time_in.split(",").slice(0, 2).join(",");
    // -> "Jul. 21, 2025"

    // Convert "HH:mm" (24h) to 12h AM/PM
    const [hours, minutes] = newTime.split(":");
    let h = parseInt(hours, 10);
    const m = minutes.padStart(2, "0");
    const ampm = h >= 12 ? "PM" : "AM";
    if (h === 0) h = 12; // 00 → 12 AM
    else if (h > 12) h -= 12; // 13..23 → 1..11 PM

    const formattedTime = `${h}:${m} ${ampm}`;

    // Combine date with new time
    updatedDateTime = `${datePart}, ${formattedTime}`;
    // -> "Jul. 21, 2025, 11:24 AM"
  } else {
    updatedDateTime = newTime;
  }

  /* console.log("Updating row with new time_in:", updatedDateTime); */

  loading.value = true;

  try {
    const dtrTimeIN = {
      id: row.id,
      time_in: updatedDateTime,
    };
    await dtrStore.updateDTRTimeIN(dtrTimeIN);

    // Update UI
    row.time_in = updatedDateTime;
  } catch (error) {
    console.error("Error updating DTR:", error);
  } finally {
    loading.value = false;
  }
};

const updateDTRTimeOutOnly = async (row, newTime, type) => {
  /* console.log("updateDTRTimeOutOnly composables", row, newTime, type); */

  let updatedDateTime;
  if (row.time_out && type === "time") {
    // Extract only the "Jul. 21, 2025" part (date only, no old time)
    const datePart = row.time_out.split(",").slice(0, 2).join(",");

    // Convert "HH:mm" (24h) to 12 AM/PM
    const [hours, minutes] = newTime.split(":");
    let h = parseInt(hours, 10);
    const m = minutes.padStart(2, 0);
    const ampm = h >= 12 ? "PM" : "AM";
    if (h === 0) h = 12; // 00 → 12 AM
    else if (h > 12) h -= 12; // 13..23 → 1..11 PM

    const formattedTime = `${h}:${m} ${ampm}`;

    // Conbine date with new time
    updatedDateTime = `${datePart}, ${formattedTime}`;
  } else {
    updatedDateTime = newTime;
  }

  /* console.log("Updating row with new time_out:", updatedDateTime); */
  loading.value = true;
  try {
    const dtrTimeOUT = {
      id: row.id,
      time_out: updatedDateTime,
    };
    await dtrStore.updateDTRTimeOUT(dtrTimeOUT);

    // Update UI
    row.time_out = updatedDateTime;
  } catch (error) {
    console.error("Error updating DTR:", error);
  } finally {
    loading.value = false;
  }
};

const updateDTRLunchBreakStart = async (row, newTime, type) => {
  /* console.log("updateDTRLunchBreakStart composables", row, newTime, type); */

  let updatedDateTime;

  if (type === "time") {
    let datePart;

    if (!row.lunch_break_start) {
      // Case 1: lunch_break_start is null → use time_in's date
      datePart = row.time_in.split(",").slice(0, 2).join(",").trim();
    } else {
      // Case 2: lunch_break_start has a value → use that date
      datePart = row.lunch_break_start.split(",").slice(0, 2).join(",").trim();
    }

    // Convert "HH:mm" (24h) to 12h AM/PM
    const [hours, minutes] = newTime.split(":");
    let h = parseInt(hours, 10);
    const m = minutes.padStart(2, "0");
    const ampm = h >= 12 ? "PM" : "AM";
    if (h === 0) h = 12;
    else if (h > 12) h -= 12;

    const formattedTime = `${h}:${m} ${ampm}`;

    // Combine date with new time
    updatedDateTime = `${datePart}, ${formattedTime}`;
  } else {
    updatedDateTime = newTime;
  }

  /* console.log("Updating row with new lunch_break_start:", updatedDateTime); */
  loading.value = true;
  try {
    const dtrLunchBreakStart = {
      id: row.id,
      lunch_break_start: updatedDateTime,
    };

    await dtrStore.updateDTRLunchBreakStart(dtrLunchBreakStart);

    // Update UI
    row.lunch_break_start = updatedDateTime;
  } catch (error) {
    console.error("Error updating DTR:", error);
  } finally {
    loading.value = false;
  }
};

const updateDTRLunchBreakEnd = async (row, newTime, type) => {
  /* console.log("updateDTRLunchBreakEnd composables", row, newTime, type); */

  let updatedDateTime;

  if (type === "time") {
    let datePart;

    if (!row.lunch_break_end) {
      // Case 1: lunch_break_end is null → use time_in's date
      datePart = row.time_in.split(",").slice(0, 2).join(",").trim();
    } else {
      // Case 2: lunch_break_end has a value → use that date
      datePart = row.lunch_break_end.split(",").slice(0, 2).join(",").trim();
    }

    // Convert "HH:mm" (24h) to 12h AM/PM
    const [hours, minutes] = newTime.split(":");
    let h = parseInt(hours, 10);
    const m = minutes.padStart(2, "0");
    const ampm = h >= 12 ? "PM" : "AM";
    if (h === 0) h = 12;
    else if (h > 12) h -= 12;

    const formattedTime = `${h}:${m} ${ampm}`;

    // Combine date with new time
    updatedDateTime = `${datePart}, ${formattedTime}`;
  } else {
    updatedDateTime = newTime;
  }

  /* console.log("Updating row with new lunch_break_end:", updatedDateTime); */
  loading.value = true;
  try {
    const dtrLunchBreakEnd = {
      id: row.id,
      lunch_break_end: updatedDateTime,
    };

    await dtrStore.updateDTRLunchBreakEnd(dtrLunchBreakEnd);

    // Update UI
    row.lunch_break_end = updatedDateTime;
  } catch (error) {
    console.error("Error updating DTR:", error);
  } finally {
    loading.value = false;
  }
};

const updateDTRBreakStart = async (row, newTime, type) => {
  /* console.log("updateDTRBreakStart composables", row, newTime, type); */
  /* console.log("row updateDTRBreakStart", row.break_start); */

  let updatedDateTime;

  if (type === "time") {
    let datePart;

    if (!row.lunch_break_end) {
      // Case 1: lunch_break_end is null → use time_in's date
      datePart = row.time_in.split(",").slice(0, 2).join(",").trim();
    } else {
      // Case 2: lunch_break_end has a value → use that date
      datePart = row.lunch_break_end.split(",").slice(0, 2).join(",").trim();
    }

    // Convert "HH:mm" (24h) to 12h AM/PM
    const [hours, minutes] = newTime.split(":");
    let h = parseInt(hours, 10);
    const m = minutes.padStart(2, "0");
    const ampm = h >= 12 ? "PM" : "AM";
    if (h === 0) h = 12;
    else if (h > 12) h -= 12;

    const formattedTime = `${h}:${m} ${ampm}`;

    // Combine date with new time
    updatedDateTime = `${datePart}, ${formattedTime}`;
  } else {
    updatedDateTime = newTime;
  }

  /* console.log("Updating row with new break_start:", updatedDateTime); */
  loading.value = true;
  try {
    const dtrLunchBreakEnd = {
      id: row.id,
      break_start: updatedDateTime,
    };

    await dtrStore.updateDTRBreakStart(dtrLunchBreakEnd);

    row.break_start = updatedDateTime;
  } catch (error) {
    console.error("Error updating DTR:", error);
  } finally {
    loading.value = false;
  }
};

const updateDTRBreakEnd = async (row, newTime, type) => {
  /* console.log("updateDTRBreakEnd composables", row, newTime, type); */
  /* console.log("row updateDTRBreakEnd", row.break_end); */

  let updatedDateTime;

  if (type === "time") {
    let datePart;

    if (!row.break_end) {
      // Case 1: break_end is null → use time_in's date
      datePart = row.time_in.split(",").slice(0, 2).join(",").trim();
    } else {
      // Case 2: break_end has a value → use that date
      datePart = row.break_end.split(",").slice(0, 2).join(",").trim();
    }

    // Convert "HH:mm" (24h) to 12h AM/PM

    const [hours, minutes] = newTime.split(":");
    let h = parseInt(hours, 10);
    const m = minutes.padStart(2, "0");
    const ampm = h >= 12 ? "PM" : "AM";
    if (h === 0) h = 12;
    else if (h > 12) h -= 12;

    const formattedTime = `${h}:${m} ${ampm}`;

    // Combine date withnew time
    updatedDateTime = `${datePart}, ${formattedTime}`;
  } else {
    updatedDateTime = newTime;
  }

  /* console.log("Updating row with new break_end:", updatedDateTime); */
  loading.value = true;
  try {
    const dtrBreakEnd = {
      id: row.id,
      break_end: updatedDateTime,
    };

    await dtrStore.updatedDTRBreakEnd(dtrBreakEnd);

    row.break_end = updatedDateTime;
  } catch (error) {
    console.error("Error updating DTR:", error);
  } finally {
    loading.value = false;
  }
};

const convertDisplayToInput = (displayVal) => {
  if (!displayVal) return "";

  const parsed = new Date(displayVal);
  if (isNaN(parsed)) return "";

  // "YYYY-MM-DDTHH:mm" → fits <input type="datetime-local">
  return date.formatDate(parsed, "YYYY-MM-DDTHH:mm");
};

const updateDTROvertimeStart = async (row, newTime) => {
  /* console.log("updateDTROvertimeStart composables", row, newTime); */

  // Parse the string inti Date
  const parsed = new Date(newTime);

  if (isNaN(parsed)) {
    /* console.log("⚠️ Invalid datetime:", newTime); */
    return;
  }

  // Format inti "Jul. 22, 2025, 11:11 AM"
  const formatted = date.formatDate(parsed, "MMM. DD, YYYY, hh:mm A");

  // Build backend payload (keep ISO for)
  /* console.log("🔹 Formatted for display:", formatted); */
  loading.value = true;
  try {
    const dtrOvertimeStart = {
      id: row.id,
      overtime_start: formatted,
    };

    await dtrStore.updatedDTROvertimeStart(dtrOvertimeStart);

    row.overtime_start = formatted;
  } catch (error) {
    console.error("Error updating DTR:", error);
  } finally {
    loading.value = false;
  }
};

const updateDTROvertimeEnd = async (row, newTime) => {
  /* console.log("updateDTROvertimeOver composables", row, newTime); */

  // Parse the string intial date
  const parsed = new Date(newTime);

  if (isNaN(parsed)) {
    /* console.log("⚠️ Invalid datetime:", newTime); */
    return;
  }

  // Format inti "Jul. 22, 2025, 11:11 AM"
  const formatted = date.formatDate(parsed, "MMM. DD, YYYY, hh:mm A");

  // Build backend payload (keep ISO for)
  /* console.log("🔹 Formatted for display:", formatted); */
  loading.value = true;
  try {
    const dtrOvertimeEnd = {
      id: row.id,
      overtime_end: formatted,
    };

    await dtrStore.updatedDTROvertimeEnd(dtrOvertimeEnd);

    row.overtime_end = formatted;
  } catch (error) {
    console.error("Error updating DTR:", error);
  } finally {
    loading.value = false;
  }
};

const updateDTROvertimeReasons = async (row, newReason) => {
  /* console.log("updateDTRReasons composables", row, newReason); */

  loading.value = true;
  try {
    const overtimeReasons = {
      id: row.id,
      overtime_reason: newReason,
    };

    await dtrStore.updateDTROvertimeReasons(overtimeReasons);
  } catch (error) {
    console.error("Error updating DTR:", error);
  } finally {
    loading.value = false;
  }
};

const updateDTRDeclineReasons = async (row, newReason) => {
  /* console.log("updateDTRDeclineReasons composables", row, newReason); */
  loading.value = true;
  try {
    const declineReasons = {
      id: row.id,
      declined_reason: newReason,
    };
    await dtrStore.updateDTROvertimeDeclinedReasons(declineReasons);
  } catch (error) {
    console.error("Error updating DTR:", error);
  } finally {
    loading.value = false;
  }
};

const updateDTROTStatus = async (row, newStatus) => {
  /* console.log("updateDTROTStatus composables", row, newStatus); */
  loading.value = true;
  try {
    const overtimeStatus = {
      id: row.id,
      ot_status: newStatus,
    };
    await dtrStore.updateDTROTStatus(overtimeStatus);
  } catch (error) {
    console.error("Error updating DTR:", error);
  } finally {
    loading.value = false;
  }
};

const updateDTROTApprovedBy = async (row, val) => {
  // `val` here is what you assigned to scope.value (employee object or id)
  const emp = typeof val === "object" ? val : selectedEmployee.value;

  if (!emp) return;

  // Call your API here with emp.id
  /* console.log("updateDTROTApprovedBy composables", row, emp); */
  loading.value = true;
  try {
    const approvedBy = {
      id: row.id,
      approved_by: emp.id,
    };

    await dtrStore.updateDTROTApprovedBy(approvedBy);
  } catch (error) {
    console.error("Error updating DTR:", error);
  } finally {
    loading.value = false;
  }

  // update UI
  row.approvedBy = emp;

  // cleanup
  selectedEmployee.value = null;
  searchKeyword.value = "";
};

/**
 * Fetches and reloads the DTR table data based on pagination and filter.
 * @param {number} page - The current page number.
 * @param {number} rowsPerPage - The number of rows per page.
 * @param {string} search - The search string.
 */
const reloadTableData = async (page = 0, rowsPerPage = 5, search = "") => {
  try {
    loading.value = true;
    await dtrStore.fetchDTR(page, rowsPerPage, search);
    const { data, current_page, per_page, total } = dtrData.value;
    dtrRows.value = data;
    /* console.log("dtrRows.value", dtrRows.value); */
    pagination.value = {
      page: current_page,
      rowsPerPage: per_page,
      rowsNumber: total,
    };
  } catch (error) {
    console.error("Error fetching DTR data:", error);
    // Optionally show a Quasar notification here
  } finally {
    loading.value = false;
  }
};

const getShiftStatusChip = (status) => {
  const val = status || "Regular Day";

  if (val === "Half Day") {
    return { label: val, color: "orange" };
  } else if (val === "Regular Day") {
    return { label: val, color: "green" };
  }
  return { label: val, color: "grey-4" };
};

// Column definitions for the q-table
const dtrColumns = [
  {
    name: "name",
    required: true,
    label: "Name",
    align: "left",
    field: (row) => helpers.formatFullname(row.employee),
    style: "position: sticky; left: 0; background: white; z-index: 1;",
    headerStyle: "position: sticky; left: 0; background: white; z-index: 2;",
  },
  {
    name: "position",
    required: true,
    label: "Position",
    align: "center",
    field: (row) => row.employee?.position || "N/A",
  },
  {
    name: "where_in",
    required: true,
    label: "Where IN",
    align: "center",
    field: (row) => row.device_in_reference_name || "N/A",
  },
  {
    name: "where_out",
    required: true,
    label: "Where OUT",
    align: "center",
    field: (row) => row.device_out_reference_name || "N/A",
  },
  {
    name: "shift_status",
    required: true,
    label: "Shift Status",
    align: "center",
    field: (row) => row.shift_status || "Regular Day",
    format: (val) => {
      const status = val || "Regular Day";
      let color = "grey-4";

      if (status === "Half Day") color = "orange";
      else if (status === "Regular Day") color = "green";

      return `<q-chip color="${color}" text-color="white" dense>${status}</q-chip>`;
    },
    sortable: true,
  },
  {
    name: "date_in",
    required: true,
    label: "Date In",
    align: "center",
    field: "time_in",
    format: helpers.formatDate,
  },
  {
    name: "date_out",
    required: true,
    label: "Date Out",
    align: "center",
    field: "time_out",
    format: helpers.formatDate,
  },
  {
    name: "time_in",
    required: true,
    label: "Time In",
    align: "center",
    field: "time_in",
  },
  {
    name: "time_out",
    required: true,
    label: "Time Out",
    align: "center",
    field: "time_out",
    format: helpers.formatTime,
  },
  {
    name: "lunch_break_start",
    required: true,
    label: "Lunch Break Start",
    align: "center",
    field: "lunch_break_start",
    format: helpers.formatTime,
  },
  {
    name: "lunch_break_end",
    required: true,
    label: "Lunch Break End",
    align: "center",
    field: "lunch_break_end",
    format: helpers.formatTime,
  },
  {
    name: "break_start",
    required: true,
    label: "Break Start",
    align: "center",
    field: "break_start",
    format: helpers.formatTime,
  },
  {
    name: "break_end",
    required: true,
    label: "Break End",
    align: "center",
    field: "break_end",
    format: helpers.formatTime,
  },
  {
    name: "break",
    required: true,
    label: "Total Break",
    align: "center",
    field: (row) => {
      const { hours, minutes } = helpers.calculateTotalWorkingHours(
        row.break_start,
        row.break_end
      );
      return `${hours}h ${minutes}m`;
    },
  },
  {
    name: "lunch_break",
    required: true,
    label: "Total Lunch Break",
    align: "center",
    field: (row) => {
      const { hours, minutes } = helpers.calculateTotalWorkingHours(
        row.lunch_break_start,
        row.lunch_break_end
      );
      return `${hours}h ${minutes}m`;
    },
  },
  {
    name: "total_working_hours",
    required: true,
    label: "Work Hours",
    align: "center",
    field: (row) => {
      const { hours, minutes } = helpers.calculateTotalWorkingHours(
        row.time_in,
        row.time_out
      );
      return `${hours}h ${minutes}m`;
    },
  },
  {
    name: "overtime_start",
    required: true,
    label: "Overtime Start",
    align: "center",
    field: "overtime_start",
    format: helpers.formatTime,
  },
  {
    name: "overtime_end",
    required: true,
    label: "Overtime End",
    align: "center",
    field: "overtime_end",
    format: helpers.formatTime,
  },
  {
    name: "total_overtime",
    required: true,
    label: "OT Total Hours",
    align: "center",
    field: (row) => {
      const { hours, minutes } = helpers.calculateTotalOvertimeHours(
        row.overtime_start,
        row.overtime_end
      );
      return `${hours}h ${minutes}m`;
    },
  },
  {
    name: "overtime_reason",
    required: true,
    label: "Overtime Reason",
    align: "justify",
    field: "overtime_reason",
    format: (val) => (val ? val : " - - - "),
  },
  {
    name: "declined_reason",
    label: "Declined Reason",
    field: "declined_reason",
    format: (val) => (val ? val : " - - - "),
    sortable: false,
  },
  {
    name: "ot_status",
    label: "OT Status",
    align: "center",
    field: (row) => row.ot_status,
    sortable: false,
  },
  {
    name: "approved_by",
    label: "Approved By",
    align: "center",
    field: (row) => helpers.formatFullname(row.approvedBy),
    sortable: false,
  },
  {
    name: "schedule_in",
    label: "Schedule In",
    align: "center",
    field: (row) => row.schedule_in,
  },
  {
    name: "schedule_out",
    label: "Schedule Out",
    align: "center",
    field: (row) => row.schedule_out,
  },
  // {
  //   name: "action",
  //   label: "Action",
  //   align: "right",
  // },
];

/**
 * Handles the @request event from q-table to manage pagination and filtering.
 * @param {object} props - The properties from the q-table request.
 */
const handleRequest = (props) => {
  reloadTableData(
    props.pagination.page,
    props.pagination.rowsPerPage,
    props.filter
  );
};

// Watch for changes in the filter and reload data
watch(filter, async (newVal) => {
  // Reset to the first page when filter changes to ensure consistent behavior
  pagination.value.page = 1;
  await reloadTableData(
    pagination.value.page,
    pagination.value.rowsPerPage,
    newVal
  );
});
// KPI computed stats from current page rows
const kpiStats = computed(() => {
  const rows = dtrRows.value || [];
  let totalMs = 0;
  let lateCount = 0;
  let undertimeCount = 0;
  let pendingOT = 0;

  rows.forEach((row) => {
    if (row.time_in && row.time_out) {
      const diffMs = new Date(row.time_out) - new Date(row.time_in);
      if (diffMs > 0) {
        totalMs += diffMs;
        const hours = diffMs / (1000 * 3600);
        if (hours < 8) undertimeCount++;
      }
    }
    if (helpers.isLateArrival(row.time_in, row.schedule_in)) lateCount++;
    if (row.ot_status === 'pending') pendingOT++;
  });

  const totalMinutesAll = Math.floor(totalMs / 60000);
  return {
    totalHours: Math.floor(totalMinutesAll / 60),
    totalMinutes: totalMinutesAll % 60,
    lateCount,
    undertimeCount,
    pendingOT,
  };
});
</script>

<style lang="scss" scoped>
.q-btn {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.q-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.gradient-header {
  background: #155e75;
}
.elegant-container {
  background: #f7f8fc;
  padding: 1rem;
  border-radius: 8px;
}

.absolute-full {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.spinner-wrapper,
.data-error {
  min-height: 40vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.table-container {
  max-height: 400px;
  overflow: hidden;
}

.q-table-container {
  overflow: hidden !important;
}

.gradient-btn {
  background: linear-gradient(135deg, #00c6ff, #0072ff);
  color: white !important;
  transition: 0.3s ease;
}

.editable-cell {
  cursor: pointer;
  padding-bottom: 2px;
}

.gradient-icon {
  font-size: 24px;
  background: linear-gradient(to right, #a0522d, #ff8833);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  display: inline-block;
}

.gradient-btn:hover {
  filter: brightness(1.1);
}

.dropdown-list {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: white;
  border-radius: 8px;
  max-height: 250px;
  overflow-y: auto;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

/* ── KPI Summary Row ─────────────────────────── */
.kpi-row {
  flex-wrap: nowrap;
}

.kpi-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 18px;
  border-radius: 14px;
  min-width: 0;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.07);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
  }

  .kpi-icon-wrap {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .kpi-value {
    font-size: 1.35rem;
    font-weight: 700;
    line-height: 1.2;
  }

  .kpi-label {
    font-size: 0.73rem;
    opacity: 0.72;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    margin-top: 2px;
  }
}

.kpi-hours {
  background: linear-gradient(135deg, #e0f2fe, #bae6fd);
  color: #0c4a6e;
  .kpi-icon-wrap { background: #0ea5e9; color: white; }
}

.kpi-late {
  background: linear-gradient(135deg, #fef3c7, #fde68a);
  color: #78350f;
  .kpi-icon-wrap { background: #f59e0b; color: white; }
}

.kpi-undertime {
  background: linear-gradient(135deg, #ffe4e6, #fecdd3);
  color: #881337;
  .kpi-icon-wrap { background: #f43f5e; color: white; }
}

.kpi-pending {
  background: linear-gradient(135deg, #f3e8ff, #e9d5ff);
  color: #4a044e;
  .kpi-icon-wrap { background: #a855f7; color: white; }
}

/* ── Late row highlight ──────────────────────── */
:deep(.dtr-late-row) td {
  border-left: 4px solid #d97706 !important;
  background-color: #fffbeb !important;
}

/* ── Time badges ─────────────────────────────── */
.time-badge {
  font-family: 'Courier New', monospace;
  font-weight: 600;
  font-size: 0.78rem;
  letter-spacing: 0.03em;
}

/* ── Late chip ───────────────────────────────── */
.late-chip {
  font-weight: 700;
  letter-spacing: 0.02em;
}

/* ── Incomplete DTR pill ─────────────────────── */
.incomplete-dtr-chip {
  background-color: #ffe4e6 !important;
  color: #e11d48 !important;
  border-radius: 4px !important;
  font-weight: 700;
  font-size: 0.72rem;
  letter-spacing: 0.04em;
}

/* ── OT Action Pill ──────────────────────────── */
.ot-action-pill {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  overflow: hidden;
  border: 1.5px solid #d1d5db;
  gap: 0;

  .ot-decline-wrap :deep(.q-btn) {
    border-radius: 0 !important;
    background: #fee2e2 !important;
    color: #b91c1c !important;
    border-right: 1px solid #fca5a5;
    padding: 4px 12px !important;
    font-size: 0.74rem;
    font-weight: 600;
    box-shadow: none !important;
    transform: none !important;
    min-height: unset;
    &:hover {
      background: #fecaca !important;
      transform: none !important;
      box-shadow: none !important;
    }
  }

  .ot-approve-wrap :deep(.q-btn) {
    border-radius: 0 !important;
    background: #dcfce7 !important;
    color: #166534 !important;
    padding: 4px 12px !important;
    font-size: 0.74rem;
    font-weight: 600;
    box-shadow: none !important;
    transform: none !important;
    min-height: unset;
    &:hover {
      background: #bbf7d0 !important;
      transform: none !important;
      box-shadow: none !important;
    }
  }
}
</style>
