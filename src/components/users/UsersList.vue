<template>


  <div class="card">
    <div class="card-header">
      <div class="d-flex align-items-center">
        <UserAdd style="margin: 0 auto"></UserAdd>
      </div>
    </div>
    <div class="card-body">
      <div style="width: 100%" v-if="users.length">

        <span>Listele  </span>
        <b-form-select
          id="per-page-select"
          v-model="perPage"
          :options="pageOptions"
          size="sm"
          style="width: 100px;"
        ></b-form-select>


        <b-form-group
          label="Arama"
          label-for="filter-input"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
          style="float:right;"
        >
          <b-input-group size="sm">
            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
            ></b-form-input>

          </b-input-group>
        </b-form-group>


        <b-table
          :items="users"
          :fields="fields"
          :current-page="currentPage"
          :per-page="perPage"
          :filter="filter"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          @filtered="onFiltered"
          hover
          head-variant="light"
        >

          <template #cell(actions)="row">
            <button
              type="button"
              data-toggle="tooltip" c
              class="btn btn-link btn-primary btn-lg"
              data-original-title="Yetkilendir"
              @click="updateRole(row.item.id)"
            >
              <i class="fas fa-user-astronaut"></i>
            </button>
            <button
              type="button"
              data-toggle="tooltip" c
              class="btn btn-link btn-primary btn-lg"
              data-original-title="Güncelle"
              @click="update(row.item.id)"
            >
              <i class="fa fa-edit"></i>
            </button>
            <button
              type="button"
              data-toggle="tooltip"
              class="btn btn-link btn-danger"
              data-original-title="Sil"
              @click="del(row.item.id)"
            >
              <i class="fa fa-times"></i>
            </button>
          </template>


        </b-table>


        <div>

          <span style="float: left; margin-top: 15px">{{ totalRows }} kayıttan 1 - {{ perPage }} arasındaki kayıtlar gösteriliyor</span>

          <b-pagination
            style="float: right; margin-top: 15px"
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            pills
          ></b-pagination>
        </div>


      </div>
      <b-alert show variant="secondary" v-else>Veri Bulunamadı!</b-alert>
    </div>
  </div>

</template>
<script>
import UserAdd from './UsersAdd'
import {mapGetters} from "vuex";


export default {
  components: {
    UserAdd
  },
  data() {
    return {
      users: [],
      sortBy: 'name',
      sortDesc: false,
      totalRows: 1,
      currentPage: 1,
      perPage: 20,
      pageOptions: [20, 30, 50, {value: 100, text: "All"}],
      filter: null,
      fields: [
        {key: 'name', label: 'İsim', sortable: true, class: 'text-center'},
        {key: 'lastName', label: 'Soyisim', sortable: true, class: 'text-center',},
        {key: 'userName', label: 'Kullanıcı Adı', sortable: true, class: 'text-center'},
        {key: 'actions', label: 'İşlemler', class: 'text-center'}
      ],
    }
  },
  methods: {
    updateRole(id) {
      this.$store.dispatch('findRole', id)
    },
    update(id) {
      this.$store.dispatch('findUser', id)
    },
    del(id) {
      swal({
        title: 'Silmek İstediğinize Emin Misiniz ?',
        text: "Bu İşlem Geri Alınamaz",
        type: 'warning',
        buttons: {
          confirm: {
            text: 'Evet, Sil!',
            className: 'btn btn-primary'
          },
          cancel: {
            visible: true,
            className: 'btn btn-danger'
          }
        }
      }).then((Delete) => {
        if (Delete) {
          this.$store.dispatch("deleteUser", id)
            .then(response => {
              if (response) {
                swal({
                  title: 'Silindi!',
                  icon: "success",
                  type: 'success',
                  buttons: {
                    confirm: {
                      className: 'btn btn-success'
                    }
                  }
                });
              } else {
                swal({
                  title: 'Hata!',
                  icon: "error",
                  buttons: {
                    confirm: {
                      className: 'btn btn-danger'
                    }
                  },
                });
              }
            })
        } else {
          swal.close();
        }
      });
    },
    onFiltered(filteredItems) {
      this.perPage = filteredItems.length
      this.currentPage = 1
    }
  },
  computed: {
    ...mapGetters(["allUsers"]),
    ...mapGetters(["getUser"]),
  },
  mounted() {
    this.totalRows = this.allUsers.length
    if (this.allUsers.length > 0) {
      for (let key in this.allUsers) {
        if (this.allUsers[key].id != this.getUser.id) {
          this.users.push(this.allUsers[key])
        }
      }
    }
  },
  watch: {
    allUsers() {
      for (let key in this.allUsers) {
        if (this.allUsers[key].id != this.getUser.id) {
          this.users.push(this.allUsers[key])
        }
      }
      this.totalRows = this.allUsers.length
    },
  }
}
</script>
