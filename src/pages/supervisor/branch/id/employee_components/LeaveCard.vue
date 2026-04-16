<template>
  <div class="leave-card">
    <!-- Card Header with Employee Info & Status -->
    <div class="card-header">
      <div class="employee-section">
        <q-avatar size="40px" class="employee-avatar">
          <img :src="getEmployeeAvatar()" alt="avatar" />
        </q-avatar>
        <div class="employee-info">
          <h4 class="employee-name">{{ employeeName }}</h4>
          <p class="employee-position">
            {{ leave.employee?.position || "Staff" }}
          </p>
        </div>
      </div>
      <div class="header-actions">
        <q-chip
          :label="leave.status || 'Pending'"
          :class="['status-badge', statusClass]"
          icon="check_circle"
        />
      </div>
    </div>

    <!-- Card Body with Visual Sections -->
    <div class="card-body">
      <!-- Date Range - Prominent Display -->
      <div class="date-range-section">
        <div class="date-badge from-date">
          <div class="badge-icon">
            <q-icon name="calendar_today" size="16px" />
          </div>
          <div class="badge-content">
            <div class="badge-label">FROM</div>
            <div class="badge-date">{{ formatDate(leave.start_date) }}</div>
          </div>
        </div>

        <div class="date-divider">
          <q-icon name="arrow_forward" size="16px" color="primary" />
        </div>

        <div class="date-badge to-date">
          <div class="badge-icon">
            <q-icon name="calendar_today" size="16px" />
          </div>
          <div class="badge-content">
            <div class="badge-label">TO</div>
            <div class="badge-date">{{ formatDate(leave.end_date) }}</div>
          </div>
        </div>
      </div>

      <!-- Key Info Cards -->
      <div class="key-info-grid">
        <!-- Duration Card -->
        <div class="key-info-card duration-card">
          <div class="info-icon">
            <q-icon name="schedule" size="20px" />
          </div>
          <div class="info-content">
            <div class="info-label">Duration</div>
            <div class="info-highlight">
              {{ leave.duration_value }}
              <span class="info-unit">{{ leave.duration_type }}</span>
            </div>
          </div>
        </div>

        <!-- Leave Type Card -->
        <div
          class="key-info-card type-card"
          v-if="leave.leave_type || leave.type"
        >
          <div class="info-icon">
            <q-icon name="assignment" size="20px" />
          </div>
          <div class="info-content">
            <div class="info-label">Leave Type</div>
            <div class="info-highlight">
              {{ leave.leave_type || leave.type }}
            </div>
          </div>
        </div>
      </div>

      <!-- Reason Section - if provided -->
      <div v-if="leave.reason" class="reason-section">
        <div class="reason-label">
          <q-icon name="description" size="14px" />
          Reason
        </div>
        <div class="reason-text">{{ leave.reason }}</div>
      </div>

      <!-- Additional Details -->
      <div class="additional-details">
        <div v-if="leave.handled_by" class="detail-row">
          <q-icon name="person" size="14px" class="detail-icon" />
          <div>
            <span class="detail-label">Handled by:</span>
            <span class="detail-value">{{ leave.handled_by }}</span>
          </div>
        </div>

        <div class="detail-row">
          <q-icon name="schedule" size="14px" class="detail-icon" />
          <div>
            <span class="detail-label">Requested:</span>
            <span class="detail-value">{{
              formatDate(leave.created_at || leave.requested_at)
            }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Card Footer -->
    <div class="card-footer">
      <div class="footer-actions">
        <q-btn
          flat
          dense
          label="Edit"
          icon="edit"
          color="secondary"
          class="edit-btn"
          @click="$emit('edit', leave)"
        />
        <q-btn
          flat
          dense
          label="View Full Details"
          icon-right="open_in_new"
          color="primary"
          class="action-btn"
          @click="$emit('view', leave)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  leave: { type: Object, required: true },
});

const emit = defineEmits(["view", "edit"]);

const employeeName = computed(() => {
  const emp = props.leave.employee || {};
  const first = emp.firstname || "";
  const last = emp.lastname || "";
  return (first + " " + last).trim() || "Unknown Employee";
});

const statusClass = computed(() => {
  const status = (props.leave.status || "").toLowerCase();
  return (
    {
      pending: "status-pending",
      approved: "status-approved",
      rejected: "status-rejected",
      cancelled: "status-cancelled",
    }[status] || "status-pending"
  );
});

const formatDate = (dateStr) => {
  if (!dateStr) return "N/A";
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
};

const getEmployeeAvatar = () => {
  const emp = props.leave.employee || {};
  if (emp.avatar) return emp.avatar;

  const firstInitial = emp.firstname?.[0] || "";
  const lastInitial = emp.lastname?.[0] || "";
  const initials = (firstInitial + lastInitial).trim() || "NA";

  return `https://ui-avatars.com/api/?name=${initials}&background=667eea&color=fff&size=128`;
};
</script>

<style scoped lang="scss">
.leave-card {
  background: white;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 32px rgba(102, 126, 234, 0.12);
    border-color: rgba(102, 126, 234, 0.3);
  }

  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 12px;
    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
    border-bottom: 1px solid #e2e8f0;

    .employee-section {
      display: flex;
      align-items: center;
      gap: 8px;
      flex: 1;

      .employee-avatar {
        border: 2px solid white;
        box-shadow: 0 2px 6px rgba(102, 126, 234, 0.15);
        flex-shrink: 0;
        width: 40px;
        height: 40px;
      }

      .employee-info {
        flex: 1;

        .employee-name {
          margin: 0;
          font-size: 0.85rem;
          font-weight: 700;
          color: #1f2937;
          letter-spacing: -0.3px;
        }

        .employee-position {
          margin: 2px 0 0;
          font-size: 0.7rem;
          color: #64748b;
          font-weight: 500;
        }
      }
    }

    .header-actions {
      .status-badge {
        font-weight: 700;
        font-size: 0.65rem;
        padding: 3px 8px;
        text-transform: uppercase;
        letter-spacing: 0.4px;

        &.status-pending {
          background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
          color: #92400e;
        }

        &.status-approved {
          background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
          color: #166534;
        }

        &.status-rejected {
          background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
          color: #991b1b;
        }

        &.status-cancelled {
          background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
          color: #374151;
        }
      }
    }
  }

  .card-body {
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    .date-range-section {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      background: linear-gradient(
        135deg,
        rgba(102, 126, 234, 0.08) 0%,
        rgba(118, 75, 162, 0.08) 100%
      );
      padding: 10px;
      border-radius: 8px;
      border: 1px solid rgba(102, 126, 234, 0.15);

      .date-badge {
        flex: 1;
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 6px 8px;
        background: white;
        border-radius: 8px;
        transition: all 0.2s ease;

        &:hover {
          box-shadow: 0 2px 6px rgba(102, 126, 234, 0.12);
          transform: translateY(-1px);
        }

        .badge-icon {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: white;
          font-size: 14px;
        }

        .badge-content {
          flex: 1;
        }

        .badge-label {
          font-size: 0.6rem;
          font-weight: 700;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.4px;
          margin-bottom: 1px;
        }

        .badge-date {
          font-size: 0.8rem;
          font-weight: 700;
          color: #1f2937;
        }

        &.from-date {
          .badge-icon {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          }
        }

        &.to-date {
          .badge-icon {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          }
        }
      }

      .date-divider {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2px;
        color: #667eea;
        font-size: 14px;
      }
    }

    .key-info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      gap: 8px;

      .key-info-card {
        background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        padding: 10px;
        display: flex;
        gap: 8px;
        align-items: flex-start;
        transition: all 0.2s ease;

        &:hover {
          border-color: rgba(102, 126, 234, 0.3);
          box-shadow: 0 2px 6px rgba(102, 126, 234, 0.08);
        }

        .info-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
          font-size: 16px;
        }

        .info-content {
          flex: 1;
        }

        .info-label {
          font-size: 0.6rem;
          font-weight: 700;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.4px;
          margin-bottom: 2px;
        }

        .info-highlight {
          font-size: 0.85rem;
          font-weight: 700;
          color: #1f2937;

          .info-unit {
            font-size: 0.7rem;
            color: #64748b;
            font-weight: 600;
          }
        }

        &.duration-card {
          .info-icon {
            background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          }
        }

        &.type-card {
          .info-icon {
            background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
          }
        }
      }
    }

    .reason-section {
      background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
      border: 1px solid rgba(251, 191, 36, 0.3);
      border-radius: 8px;
      padding: 8px 10px;
      border-left: 3px solid #f59e0b;

      .reason-label {
        font-size: 0.6rem;
        font-weight: 700;
        color: #92400e;
        text-transform: uppercase;
        letter-spacing: 0.4px;
        display: flex;
        align-items: center;
        gap: 4px;
        margin-bottom: 6px;
      }

      .reason-text {
        font-size: 0.8rem;
        color: #451a03;
        line-height: 1.4;
        font-weight: 500;
      }
    }

    .additional-details {
      display: flex;
      flex-direction: column;
      gap: 6px;
      padding: 8px;
      background: #f8fafc;
      border-radius: 8px;

      .detail-row {
        display: flex;
        gap: 6px;
        align-items: flex-start;
        font-size: 0.75rem;

        .detail-icon {
          color: #667eea;
          margin-top: 1px;
          flex-shrink: 0;
          font-size: 12px;
        }

        div {
          flex: 1;
        }

        .detail-label {
          font-weight: 600;
          color: #64748b;
          font-size: 0.65rem;
          display: block;
          margin-bottom: 1px;
        }

        .detail-value {
          color: #1f2937;
          font-weight: 500;
          font-size: 0.8rem;
        }
      }
    }
  }

  .card-footer {
    padding: 8px 12px;
    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
    border-top: 1px solid #e2e8f0;
    display: flex;
    justify-content: flex-end;

    .footer-actions {
      display: flex;
      gap: 8px;
    }

    .edit-btn,
    .action-btn {
      font-weight: 700;
      padding: 5px 12px;
      font-size: 0.75rem;
      transition: all 0.2s ease;
    }

    .action-btn {
      color: #2563eb;
    }

    .edit-btn {
      color: #6b7280;
    }

    .edit-btn:hover,
    .action-btn:hover {
      background: rgba(102, 126, 234, 0.1);
      transform: translateX(2px);
    }
  }
}

@media (max-width: 768px) {
  .leave-card {
    .card-header {
      padding: 10px 12px;

      .employee-section {
        gap: 8px;

        .employee-avatar {
          width: 38px;
          height: 38px;
        }

        .employee-info {
          .employee-name {
            font-size: 0.85rem;
          }

          .employee-position {
            font-size: 0.7rem;
          }
        }
      }

      .header-actions {
        .status-badge {
          font-size: 0.65rem;
          padding: 3px 8px;
        }
      }
    }

    .card-body {
      padding: 10px;
      gap: 10px;

      .date-range-section {
        flex-direction: column;
        padding: 10px;
        gap: 8px;

        .date-badge {
          width: 100%;
          padding: 8px 9px;
        }

        .date-divider {
          transform: rotate(90deg);
          padding: 2px;
          font-size: 14px;
        }
      }

      .key-info-grid {
        grid-template-columns: 1fr;
        gap: 8px;

        .key-info-card {
          padding: 10px;
          gap: 8px;

          .info-icon {
            width: 30px;
            height: 30px;
            font-size: 16px;
          }

          .info-label {
            font-size: 0.6rem;
          }

          .info-highlight {
            font-size: 0.85rem;

            .info-unit {
              font-size: 0.7rem;
            }
          }
        }
      }

      .reason-section {
        padding: 8px 10px;

        .reason-label {
          font-size: 0.6rem;
          gap: 3px;
        }

        .reason-text {
          font-size: 0.8rem;
        }
      }

      .additional-details {
        padding: 8px;
        gap: 6px;

        .detail-row {
          font-size: 0.75rem;

          .detail-icon {
            font-size: 12px;
          }

          .detail-label {
            font-size: 0.65rem;
          }

          .detail-value {
            font-size: 0.8rem;
          }
        }
      }
    }

    .card-footer {
      padding: 8px 12px;

      .action-btn {
        font-size: 0.75rem;
        padding: 5px 12px;
      }
    }
  }
}
</style>
