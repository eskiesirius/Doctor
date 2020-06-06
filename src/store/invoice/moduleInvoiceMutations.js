export default {
  SET_INVOICE (state,invoices) {
    state.invoices = invoices
  },
  ADD_INVOICE (state,invoice) {
    state.invoices.push(invoice)
  },
  UPDATE_INVOICE (state,invoice) {
  	const invoiceIndex = state.invoices.findIndex((e) => e.id === invoice.id)
    Object.assign(state.invoices[invoiceIndex], invoice)
  },
  REMOVE_INVOICE (state, invoice_id) {
    const invoiceIndex = state.invoices.findIndex((e) => e.id === invoice_id)
    state.invoices.splice(invoiceIndex, 1)
  }
}