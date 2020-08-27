import { createSelector } from '@reduxjs/toolkit';
import { pickItemsFromIds, paginationLocationQuery } from 'store/selectors';

const receiptsPageSelector = (state, props, query) => {
  const viewId = state.sales_receipts.currentViewId;
  return state.sales_receipts.views?.[viewId]?.pages?.[query.page];
};

const receiptsPaginationSelector = (state, props) => {
  const viewId = state.sales_receipts.currentViewId;
  return state.sales_receipts.views?.[viewId];
};

const receiptItemsSelector = (state) => state.sales_receipts.items;

const receiptTableQuery = (state) => state.sales_receipts.tableQuery;

const receiptByIdSelector = (state, props) => state.sales_receipts.items[props.receiptId];


export const getReceiptCurrentPageFactory = () =>
  createSelector(
    receiptsPageSelector,
    receiptItemsSelector,
    (receiptPage, receiptItems) => {
      return typeof receiptPage === 'object'
        ? pickItemsFromIds(receiptItems, receiptPage.ids) || []
        : [];
    },
  );

export const getReceiptsTableQueryFactory = () =>
  createSelector(
    paginationLocationQuery,
    receiptTableQuery,
    (locationQuery, tableQuery) => {
      return {
        ...locationQuery,
        ...tableQuery,
      };
    },
  );

export const getReceiptByIdFactory = () =>
  createSelector(receiptByIdSelector, (receipt) => {
    return receipt;
  });

export const getReceiptsPaginationMetaFactory = () =>
  createSelector(receiptsPaginationSelector, (receiptPage) => {
    return receiptPage?.paginationMeta || {};
  });