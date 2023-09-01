import { BANNER_URL, UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const bannerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBannerItems: builder.query({
      query: () => ({
        url: BANNER_URL,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["BannerItems"],
    }),
    addBannerItem: builder.mutation({
      query: () => ({
        url: BANNER_URL,
        method: "POST",
      }),
      invalidatesTags: ["Banner"],
    }),
    updateBannerItem: builder.mutation({
      query: (data) => ({
        url: `${BANNER_URL}/${data.bannerId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["BannerItems"],
    }),
    uploadBannerImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    deleteBannerItem: builder.mutation({
      query: (bannerId) => ({
        url: `${BANNER_URL}/${bannerId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetBannerItemsQuery,
  useAddBannerItemMutation,
  useUpdateBannerItemMutation,
  useUploadBannerImageMutation,
  useDeleteBannerItemMutation,
} = bannerApiSlice;
