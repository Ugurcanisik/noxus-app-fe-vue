<template>
  <div>
    <div class="panel-header bg-primary-gradient">
      <div class="page-inner py-5">
        <div class="d-flex align-items-left align-items-md-center flex-column flex-md-row">
          <div>
            <h2 class="text-white pb-2 fw-bold">Gider Türü İşlemleri</h2>
          </div>
        </div>
      </div>
    </div>
    <TypeExpensesList></TypeExpensesList>
    <TypeExpensesUpdate></TypeExpensesUpdate>
  </div>
</template>
<script>
import TypeExpensesList from "./TypeExpensesList";
import TypeExpensesUpdate from "./TypeExpensesUpdate";

export default {
  components: {
    TypeExpensesList,
    TypeExpensesUpdate
  }
}
</script>
