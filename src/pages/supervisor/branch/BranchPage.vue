<template>
  <div class="branch-page-layout">
    <!-- Premium Curving Header -->
    <div class="premium-header">
      <div class="header-content q-pa-lg">
        <div class="row items-center justify-between">
          <div class="header-title-section">
            <h1 class="text-h4 text-weight-bolder text-white q-my-none display-flex items-center">
              <q-icon name="store_mall_directory" size="36px" class="q-mr-sm icon-glow" />
              Store Branches
            </h1>
            <div class="text-subtitle1 text-white text-opacity-80 q-mt-xs font-medium">
              Manage your assigned locations and inventory
            </div>
          </div>
          
          <div class="branch-count-pill" v-if="branchList && branchList.length > 0">
            <div class="pulse-dot"></div>
            <span>{{ branchList.length }} Active {{ branchList.length === 1 ? 'Branch' : 'Branches' }}</span>
          </div>
        </div>
      </div>
      <div class="header-curve"></div>
    </div>

    <!-- Main Content Area -->
    <div class="content-container">
      <q-scroll-area class="main-scroll-area">
        <div class="q-pa-lg">
          <!-- Empty State -->
          <div
            v-if="!branchList || branchList.length === 0"
            class="empty-state-modern"
          >
            <div class="empty-illustration">
              <q-icon name="storefront" size="100px" color="grey-3" />
            </div>
            <h5 class="empty-title">No Branches Available</h5>
            <p class="empty-subtitle">You haven't been assigned to any highly-active store branches yet.</p>
          </div>

          <!-- Responsive Branch Grid -->
          <div v-else class="branch-grid row q-col-gutter-xl">
            <div
              v-for="(item, index) in branchList"
              :key="index"
              class="col-12 col-sm-6 col-md-4 col-lg-3"
            >
              <q-card class="branch-card-modern" @click="goToBranch(item)">
                <!-- Image Section with Overlay -->
                <div class="card-image-wrapper">
                  <img src="https://cdn.quasar.dev/img/parallax1.jpg" alt="branch" />
                  <div class="image-gradient-overlay"></div>
                  
                  <div class="warehouse-badge">
                    <q-icon name="inventory_2" size="14px" class="q-mr-xs" />
                    {{ item.warehouse?.name || 'Main Warehouse' }}
                  </div>
                </div>

                <!-- Content Section -->
                <q-card-section class="card-content">
                  <div class="branch-title">
                    {{ capitalizeFirstLetter(item.name || "N/A") }}
                  </div>
                  
                  <div class="info-row q-mt-md">
                    <div class="info-icon">
                      <q-icon name="location_on" size="18px" />
                    </div>
                    <div class="info-text">
                      <div class="info-label">Store Address</div>
                      <div class="info-value">
                        {{ item.location || "No address provided" }}
                      </div>
                    </div>
                  </div>
                </q-card-section>
                
                <!-- Hover Action -->
                <div class="card-action-bar">
                  <span>Enter Branch</span>
                  <q-icon name="arrow_forward" size="18px" class="action-icon" />
                </div>
              </q-card>
            </div>
          </div>
        </div>
      </q-scroll-area>
    </div>
  </div>
</template>

<script setup>
import { Loading, QSpinnerGears } from "quasar";
import { route } from "quasar/wrappers";
import { useSupervisorStore } from "src/stores/supervisor";
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { typographyFormat } from "src/composables/typography/typography-format";

const { capitalizeFirstLetter, formatFullname } = typographyFormat();

const supervisorStore = useSupervisorStore();

const userData = supervisorStore.user;

console.log("userDatasss", userData);

const employeeId =
  userData?.data?.employee_id || userData?.data?.employee?.id || "";

const branchList = computed(() => supervisorStore.supervisorBranch);

console.log("branchList", branchList.value);

const router = useRouter();

const fetchBranch = async () => {
  await supervisorStore.fetchSupervisorBranch(employeeId);
  console.log("branchList", branchList.value);
};

onMounted(fetchBranch);

const goToBranch = async (branch) => {
  console.log("branch", branch);
  Loading.show({
    spinner: QSpinnerGears,
    message: "Please wait...",
  });

  try {
    await router.push({
      name: "branch-product",
      params: { branch_id: branch.id },
    });
  } finally {
    Loading.hide();
  }
};
</script>

<style lang="scss" scoped>
.branch-page-layout {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f8fafc;
  overflow: hidden;
}

/* Premium Header styling */
.premium-header {
  position: relative;
  background: linear-gradient(135deg, #ef4444 0%, #b91c1c 100%);
  padding-bottom: 30px;
  flex-shrink: 0;
  z-index: 10;
  
  .header-content {
    position: relative;
    z-index: 2;
  }

  .icon-glow {
    filter: drop-shadow(0 0 8px rgba(255,255,255,0.4));
  }

  .branch-count-pill {
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    padding: 8px 16px;
    border-radius: 30px;
    color: white;
    font-weight: 600;
    font-size: 0.9rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    .pulse-dot {
      width: 8px;
      height: 8px;
      background-color: #10b981;
      border-radius: 50%;
      box-shadow: 0 0 8px #10b981;
      animation: pulse 2s infinite;
    }
  }

  .header-curve {
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 30px;
    background: #f8fafc;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    z-index: 1;
  }
}

/* Content Container */
.content-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  margin-top: -10px; // tuck under curvature
  z-index: 2;
}

.main-scroll-area {
  flex: 1;
  height: 100%;
}

/* Empty State */
.empty-state-modern {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  text-align: center;

  .empty-illustration {
    background: white;
    width: 140px;
    height: 140px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
    margin-bottom: 24px;
  }

  .empty-title {
    font-size: 1.5rem;
    font-weight: 800;
    color: #1e293b;
    margin: 0 0 8px;
  }

  .empty-subtitle {
    font-size: 1rem;
    color: #64748b;
    max-width: 400px;
  }
}

/* Modern Branch Card */
.branch-card-modern {
  border-radius: 20px;
  background: white;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  border: 1px solid #f1f5f9;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 30px rgba(239, 68, 68, 0.12);
    border-color: rgba(239, 68, 68, 0.2);

    .image-gradient-overlay {
      opacity: 0.8;
    }

    .card-action-bar {
      background: #ef4444;
      color: white;
      
      .action-icon {
        transform: translateX(4px);
      }
    }
  }

  .card-image-wrapper {
    position: relative;
    height: 160px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.8s ease;
    }
    
    .image-gradient-overlay {
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background: linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.7));
      opacity: 0.6;
      transition: opacity 0.4s ease;
    }

    .warehouse-badge {
      position: absolute;
      top: 16px;
      right: 16px;
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(4px);
      padding: 6px 12px;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 700;
      color: #b91c1c;
      display: flex;
      align-items: center;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
  }

  .branch-card-modern:hover .card-image-wrapper img {
    transform: scale(1.08);
  }

  .card-content {
    padding: 20px;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .branch-title {
    font-size: 1.2rem;
    font-weight: 800;
    color: #0f172a;
    line-height: 1.3;
    margin-bottom: 8px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .info-row {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    margin-top: auto; 

    .info-icon {
      width: 32px;
      height: 32px;
      border-radius: 10px;
      background: #fef2f2;
      color: #ef4444;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .info-text {
      flex: 1;
      
      .info-label {
        font-size: 0.7rem;
        font-weight: 700;
        text-transform: uppercase;
        color: #94a3b8;
        letter-spacing: 0.5px;
        margin-bottom: 2px;
      }
      
      .info-value {
        font-size: 0.85rem;
        color: #475569;
        font-weight: 500;
        line-height: 1.4;
      }
    }
  }

  .card-action-bar {
    padding: 12px 20px;
    background: #f8fafc;
    border-top: 1px solid #f1f5f9;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 700;
    font-size: 0.85rem;
    color: #64748b;
    transition: all 0.3s ease;

    .action-icon {
      transition: transform 0.3s ease;
    }
  }
}

.text-ellipsis-2-lines {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@keyframes pulse {
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
  70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
}
</style>
