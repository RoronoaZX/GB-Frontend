<template>
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
    <q-table
      :rows="dtrRows"
      :columns="dtrColumns"
      row-key="time_in"
      v-model:pagination="pagination"
      :rows-per-page-options="[3, 5, 10, 0]"
      :loading="loading"
      :filter="filter"
      @request="handleRequest"
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
          <q-badge v-if="props.row.time_in" outline color="positive">
            {{ helpers.formatTime(props.row.time_in) }}
            <q-tooltip class="bg-blue-grey-8"> Edit Time IN </q-tooltip>
          </q-badge>
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
          <q-badge v-if="props.row.time_out" outline color="purple-12">
            {{ helpers.formatTime(props.row.time_out) }}
            <q-tooltip class="bg-blue-grey-8"> Edit Time OUT </q-tooltip>
          </q-badge>
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

          <!-- PENDING -->
          <div
            v-else-if="props.row.ot_status === 'pending'"
            class="q-gutter-x-sm"
          >
            <DeclineOTButton :decline="props.row" />
            <ApproveOTButton :approve="props.row" />
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

      <template #loading>
        <q-inner-loading showing>
          <q-spinner-ios size="50px" color="grey-10" />
        </q-inner-loading>
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
  console.log("updateEmployeeScheduleIn composables", data, val);

  loading.value = true;
  try {
    const employeeScheduleIn = {
      id: data.id,
      schedule_in: val,
    };
    console.log("employeeScheduleIn", employeeScheduleIn);
    await dtrStore.updateDtrScheduleIn(employeeScheduleIn);
  } catch (error) {
    console.log("error", error);
  } finally {
    loading.value = false;
  }
};

const updateEmployeeScheduleOut = async (data, val) => {
  console.log("updateEmployeeScheduleOut composables", data, val);

  loading.value = true;

  try {
    const employeeScheduleOut = {
      id: data.id,
      schedule_out: val,
    };

    console.log("employeeScheduleOut", employeeScheduleOut);
    await dtrStore.updateDtrSheduleOut(employeeScheduleOut);
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

const getBranchWithWarehouses = async () => {
  loading.value = true;
  try {
    const response = await dtrStore.getBranchWithWarehouses();
  } catch (error) {
    console.log("error", error);
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
  console.log("updateDTRWhereIN composables", data, val);

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
    console.log("error", error);
  } finally {
    loading.value = false;
  }
};

const updateDTRWhereOUT = async (data, val) => {
  console.log("updateDTRWhereOUT composables", data, val);

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
    console.log("error", error);
  } finally {
    loading.value = false;
  }
};

const updateDTRShiftStatus = async (data, val) => {
  console.log("updateDTRShiftStatus composables", data, val);

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
    console.log("error", error);
  } finally {
    loading.value = false;
  }
};

const updateDTRTimeINDateOnly = async (row, newDateTime, type) => {
  console.log("updateDTRTimeINDateOnly composables", row, newDateTime, type);

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
  console.log("Updating row with new time_in:", updatedDateTime);
  // Example API call (replace with your actual API integration)
  loading.value = true;
  try {
    const dtrDateIN = {
      id: row.id,
      time_in: updatedDateTime,
    };

    const response = await dtrStore.updateDTRDateIN(dtrDateIN);
  } catch (error) {
    console.log("error", error);
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
  console.log("updateDTRTimeOUTDateOnly composables", row, newDateTime, type);

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

  console.log("Updating row with new time_out:", updatedDateTime);

  loading.value = true;
  try {
    await dtrStore.updateDTRDateOUT({ id: row.id, time_out: updatedDateTime });
    row.time_out = updatedDateTime;
  } catch (error) {
    console.log("error", error);
  } finally {
    loading.value = false;
  }
};

const updateDTRTimeINOnly = async (row, newTime, type) => {
  console.log("updateDTRTimeINOnly composables", row, newTime, type);

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

  console.log("Updating row with new time_in:", updatedDateTime);

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
  console.log("updateDTRTimeOutOnly composables", row, newTime, type);

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

  console.log("Updating row with new time_out:", updatedDateTime);
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
  console.log("updateDTRLunchBreakStart composables", row, newTime, type);

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

  console.log("Updating row with new lunch_break_start:", updatedDateTime);
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
  console.log("updateDTRLunchBreakEnd composables", row, newTime, type);

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

  console.log("Updating row with new lunch_break_end:", updatedDateTime);
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
  console.log("updateDTRBreakStart composables", row, newTime, type);
  console.log("row updateDTRBreakStart", row.break_start);

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

  console.log("Updating row with new break_start:", updatedDateTime);
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
  console.log("updateDTRBreakEnd composables", row, newTime, type);
  console.log("row updateDTRBreakEnd", row.break_end);

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

  console.log("Updating row with new break_end:", updatedDateTime);
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
  console.log("updateDTROvertimeStart composables", row, newTime);

  // Parse the string inti Date
  const parsed = new Date(newTime);

  if (isNaN(parsed)) {
    console.log("⚠️ Invalid datetime:", newTime);
    return;
  }

  // Format inti "Jul. 22, 2025, 11:11 AM"
  const formatted = date.formatDate(parsed, "MMM. DD, YYYY, hh:mm A");

  // Build backend payload (keep ISO for)
  console.log("🔹 Formatted for display:", formatted);
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
  console.log("updateDTROvertimeOver composables", row, newTime);

  // Parse the string intial date
  const parsed = new Date(newTime);

  if (isNaN(parsed)) {
    console.log("⚠️ Invalid datetime:", newTime);
    return;
  }

  // Format inti "Jul. 22, 2025, 11:11 AM"
  const formatted = date.formatDate(parsed, "MMM. DD, YYYY, hh:mm A");

  // Build backend payload (keep ISO for)
  console.log("🔹 Formatted for display:", formatted);
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
  console.log("updateDTRReasons composables", row, newReason);

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
  console.log("updateDTRDeclineReasons composables", row, newReason);
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
  console.log("updateDTROTStatus composables", row, newStatus);
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
  console.log("updateDTROTApprovedBy composables", row, emp);
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
    console.log("dtrRows.value", dtrRows.value);
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
  min-height: 40vh; /* Minimum height of 50% viewport height */
  display: flex;
  justify-content: center;
  align-items: center;
}
.table-container {
  max-height: 400px; /* Adjust as needed */
  overflow: hidden;
}

.q-table-container {
  overflow: hidden !important; /* Target the container generated by q-table */
}

.gradient-btn {
  background: linear-gradient(135deg, #00c6ff, #0072ff);
  color: white !important;
  transition: 0.3s ease;
}

.editable-cell {
  cursor: pointer;
  /* Optional: add a subtle underline to invite clicks */
  // border-bottom: 1px dashed #777;
  padding-bottom: 2px;
}

.gradient-icon {
  font-size: 24px; /* Adjust size as needed */
  background: linear-gradient(to right, #a0522d, #ff8833);
  -webkit-background-clip: text; /* For compatibility */
  background-clip: text;
  color: transparent; /* Make text fill transparent */
  display: inline-block; /* Ensure proper display */
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
</style>
