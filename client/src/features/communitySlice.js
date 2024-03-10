import { createSlice } from "@reduxjs/toolkit";
import { getAllCommunity, getMyCommunity, joinCommunity, newCommunity } from "../Services/communityService";
import { toast } from "react-toastify";



const initialState = {
    community: [],
    myCommunity: [],
    isLoading: false,
    isError: false,
    errorMessage: "",
    isSuccess: false,
    status: null
};

export const communitySlice = createSlice({
    name: "community",
    initialState,
    reducers: {
        resetCommunity: (state) => {
            state.isSuccess = false;
            state.isError = false;
            state.status = null;
            state.errorMessage = ""
        }
    },
    extraReducers: (builder) => {
        builder.addCase(newCommunity.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(newCommunity.fulfilled, (state, action) => {
            state.isLoading = false;
            console.log(action.payload)
            state.myCommunity = [{ ...action.payload?.newCommunity, members: action.payload?.members }, ...state.myCommunity]
            state.isSuccess = true;
            toast.success("New community created");
        })
        builder.addCase(newCommunity.rejected, (state) => {
            state.isError = true;
            state.isLoading = false;
            toast.error('error while creating community');

        })


        //get my community
        builder.addCase(getMyCommunity.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getMyCommunity.fulfilled, (state, action) => {
            state.isLoading = false;
            state.myCommunity = action.payload?.community
            state.isSuccess = true;
        })
        builder.addCase(getMyCommunity.rejected, (state) => {
            state.isError = true;
            state.isLoading = false;
            toast.error("error while fetching community")

        })

        //get all community
        builder.addCase(getAllCommunity.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getAllCommunity.fulfilled, (state, action) => {
            state.isLoading = false;
            state.community = action.payload?.community
            state.isSuccess = true;
        })
        builder.addCase(getAllCommunity.rejected, (state) => {
            state.isError = true;
            state.isLoading = false;
            toast.error('error while fetching community')
        })

        //join community
        builder.addCase(joinCommunity.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(joinCommunity.fulfilled, (state, action) => {
            state.isLoading = false;
            state.community = state.community.map((item) => {
                if (item._id === action.payload.member.community_id) {
                    item.members.push(action.payload.member);
                }
                return item;
            })
            state.myCommunity = [{ ...action.payload?.community, members: action.payload?.members }, ...state.myCommunity]
            state.isSuccess = true;
        })
        builder.addCase(joinCommunity.rejected, (state) => {
            state.isError = true;
            state.isLoading = false;
            toast.error('error while joining community')
        })


        //     //accept join request
        //     builder.addCase(acceptJoinRequest.pending, (state) => {
        //         state.isLoading = true;
        //     })
        //     builder.addCase(acceptJoinRequest.fulfilled, (state, action) => {
        //         state.isLoading = false;
        //         state.community = state.community.map((item) => {
        //             if (item._id === action.payload.member.community_id) {
        //                 item.members.map((member) => {
        //                     if (member.user_id === action.payload.member.user_id) {
        //                         member.status = action.payload.member.status
        //                     }
        //                     return member;
        //                 })
        //             }
        //             return item;
        //         })

        //         state.isSuccess = true;
        //     })
        //     builder.addCase(acceptJoinRequest.rejected, (state, action) => {
        //         state.isError = true;
        //         state.isLoading = false;
        //         const error = action.payload as {
        //             message: string,
        //             status: number
        //         };
        //         state.errorMessage = error.message;
        //         state.status = error.status;

        //     })
        //     //accept join request
        //     builder.addCase(editCommunity.pending, (state) => {
        //         state.isLoading = true;
        //     })
        //     builder.addCase(editCommunity.fulfilled, (state, action) => {
        //         state.isLoading = false;
        //         state.myCommunity = state.myCommunity.map((item) => {
        //             if (item._id === action.payload.community._id) {
        //                 item = {
        //                     ...item,
        //                     community_name: action.payload.community.community_name,
        //                     topic: action.payload.community.topic,
        //                     about: action.payload.community.about,
        //                     privacy: action.payload.community.privacy,
        //                     icon: action.payload.community.icon
        //                 }
        //             }
        //             return item;
        //         })
        //         state.isSuccess = true;
        //         toast.success("Community edited");
        //     })
        //     builder.addCase(editCommunity.rejected, (state, action) => {
        //         state.isError = true;
        //         state.isLoading = false;
        //         const error = action.payload as {
        //             message: string,
        //             status: number
        //         };
        //         state.errorMessage = error.message;
        //         state.status = error.status;

        //     })
    }
})

export const { resetCommunity } = communitySlice.actions;

export default communitySlice.reducer;
