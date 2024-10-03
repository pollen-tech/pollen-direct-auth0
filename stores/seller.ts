import { defineStore } from "pinia";
import { DIRECT_ONBOARD_COMPANY } from "~/utils/constant.js";
import { directApi, onboardingApi } from "~/services/api";

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
      category: [],
      sub_category: [],
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
      seller_company: null,
      user_profile: null,
    };
  },
  actions: {
    async get_company_types() {
      // TODO change to directApi
      const req = await directApi(`${DIRECT_ONBOARD_COMPANY}/company-type`);
      this.seller_company_types = req.data;
    },
    async get_liquidation_unit() {
      const data = await onboardingApi("/onboard-company/liquidate-unit");
      this.seller_liquidate = data;
    },
    async validate_company_exist(param: string) {
      const body = {
        company_name: param,
      };
      const { data } = await directApi(
        `${DIRECT_ONBOARD_COMPANY}?${new URLSearchParams(body).toString()}`
      );
      return data;
    },
    async get_company_profile(param: any, paramBool: boolean) {
      if (!this.seller_company || paramBool) {
        const data = await directApi(
          `${DIRECT_ONBOARD_COMPANY}/users/${param}`
        );
        this.seller_company = data;
        return data;
      } else {
        return this.seller_company;
      }
    },
    async validate_user_exist(param: any) {
      const req = await onboardingApi(`/users/pollen-pass-by-email/${param}`);
      return req;
    },
    async get_user_profile(param: any) {
      if (this.user_profile == null) {
        const req = await onboardingApi(`/users/${param}`);

        this.user_profile = req.data || req;
        console.log(req);
        return req;
      } else {
        return this.user_profile;
      }
    },
    async get_user_channel(param: any) {
      const req = await onboardingApi(`/users/channel/${param}`);
      return req;
    },
    async get_category() {
      const { data } = await onboardingApi("/product-category");
      this.category = data;
    },
    async get_sub_category(id: number) {
      const { data } = await onboardingApi(
        `/product-category/${id}/sub-category`
      );
      this.sub_category = data;
      return data;
    },
    async get_order_unit() {
      const { data } = await onboardingApi(
        `${DIRECT_ONBOARD_COMPANY}/order-volume`
      );
      this.order_unit = data;
    },
    async get_company_interest(param: any) {
      const data = await directApi(
        `${DIRECT_ONBOARD_COMPANY}/${param}/interest`
      );
      return data;
    },
  },
});
