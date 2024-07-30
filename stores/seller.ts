import { defineStore } from "pinia";
import { lmsApi, directApi } from "~/services/api";

export const useSellerStore = defineStore("seller", {
  state: () => {
    return {
      companyType: [
        { id: 1, title: "Principal", description: "Product or Brand Owner" },
        {
          id: 2,
          title: "Factory / Production Facility",
          description:
            "Owner of the production, but not the original brand owner ",
        },
        {
          id: 3,
          title: "Distributor / Wholesaler",
          description: "Packaged  Finished goods",
        },
        {
          id: 4,
          title: "Agent",
          description:
            "Represents inventory but doesn't own the warehouse where goods are stored",
        },
        { id: 5, title: "Logistics", description: "Fulfillment Facility" },
        { id: 6, title: "Retailer", description: "Sells direct to consumer" },
      ],
      seller_company_types: [],
      seller_liquidate: [],
      sellerProfile: {},
      category: [
        {
          category_id: 1,
          category_name: "Hair Care",
        },
        {
          category_id: 2,
          category_name: "Skin Care",
        },
      ],
      subCategory: [],
      order_unit: [
        {
          id: 1,
          name: "Carton",
        },
        {
          id: 2,
          name: "Pallet",
        },
        {
          id: 3,
          name: "20ft Container",
        },
        {
          id: 4,
          name: "40ft Container",
        },
      ],
    };
  },
  actions: {
    async get_company_types() {
      // TODO change to directApi
      const data = await lmsApi(`/onboard-company/company-type`);
      this.seller_company_types = data;
    },
    async get_liquidation_unit() {
      const data = await lmsApi(`/onboard-company/liquidate-unit`);
      this.seller_liquidate = data;
    },
    async validate_company_exist(param: string) {
      const body = {
        company_name: param,
      };
      // TODO change to directApi
      const data = await lmsApi(
        `/onboard-company?${new URLSearchParams(body).toString()}`
      );
      return data;
    },
    async get_company_profile(param: any) {
      const data = await lmsApi(`/onboard-company/users/${param}`);
      return data;
    },
    async validate_user_exist(param: any) {
      const req = await lmsApi(`/users/pollen-pass-by-email/${param}`);
      return req;
    },
    async get_user_profile(param: any) {
      const req = await lmsApi(`/users/${param}`);
      return req;
    },
    async get_user_channel(param: any) {
      const req = await lmsApi(`/users/channel/${param}`);
      return req;
    },
    async get_category(param: any) {
      // const req = await lmsApi(`/users/category`);
      // return req;
      return this.category;
    },
    async get_order_unit(param: any) {
      // const req = await lmsApi(`/users/category`);
      // return req;
      return this.order_unit;
    },
  },
});
