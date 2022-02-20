<template>
  <div>
    <div class="panel-header bg-primary-gradient">
      <div class="page-inner py-5">
        <div class="d-flex align-items-left align-items-md-center flex-column flex-md-row">
          <div>
            <h2 class="text-white pb-2 fw-bold">Gider İşlemleri</h2>
          </div>
        </div>
      </div>
    </div>
    <ExpenseList></ExpenseList>
    <ExpenseUpdate></ExpenseUpdate>
    <ExpenseDetails></ExpenseDetails>
  </div>
</template>
<script>
import ExpenseList from "./ExpensesList";
import ExpenseUpdate from "./ExpensesUpdate";
import ExpenseDetails from "./ExpensesDetails";

export default {
  components: {
    ExpenseList,
    ExpenseUpdate,
    ExpenseDetails
  },
}
</script>

