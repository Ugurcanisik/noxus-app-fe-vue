<template>
  <div>
    <div class="panel-header bg-primary-gradient">
      <div class="page-inner py-5">
        <div class="d-flex align-items-left align-items-md-center flex-column flex-md-row">
          <div>
            <h2 class="text-white pb-2 fw-bold">Kullanıcı İşlemleri</h2>
          </div>
        </div>
      </div>
    </div>
    <UserList></UserList>
    <UserUpdate></UserUpdate>
    <UserRoleUpdate></UserRoleUpdate>
  </div>
</template>
<script>
import UserList from "./UsersList";
import UserUpdate from "./UsersUpdate";
import UserRoleUpdate from "./UsersRoleUpdate";

export default {
  components: {
    UserList,
    UserUpdate,
    UserRoleUpdate
  },
}
</script>

