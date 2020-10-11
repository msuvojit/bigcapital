import { IVendor } from "interfaces";
import TenantRepository from "./TenantRepository";


export default class VendorRepository extends TenantRepository {
  models: any;
  cache: any;

  /**
   * Constructor method.
   * @param {number} tenantId 
   */
  constructor(tenantId: number) {
    super(tenantId);

    this.models = this.tenancy.models(tenantId);
    this.cache = this.tenancy.cache(tenantId);
  }

  /**
   * Retrieve the bill that associated to the given vendor id.
   * @param {number} vendorId - Vendor id.
   */
  getBills(vendorId: number) {
    const { Bill } = this.models;

    return this.cache.get(`vendors.bills.${vendorId}`, () => {
      return Bill.query().where('vendor_id', vendorId);
    });
  }

  /**
   * Retrieve all the given vendors.
   * @param {numner[]} vendorsIds 
   * @return {IVendor}
   */
  vendors(vendorsIds: number[]): IVendor[] {
    const { Contact } = this.models;
    return Contact.query().modifier('vendor').whereIn('id', vendorsIds);
  }

  /**
   * Retrieve vendors with associated bills.
   * @param {number[]} vendorIds 
   */
  vendorsWithBills(vendorIds: number[]) {
    const { Contact } = this.models;
    return Contact.query().modify('vendor')
      .whereIn('id', vendorIds)
      .withGraphFetched('bills');
  }
}