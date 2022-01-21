<template>
  <div>
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
