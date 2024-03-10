import { createSlice } from "@reduxjs/toolkit";
import { ICommunity } from "../../types";
import { acceptJoinRequest, editCommunity, getAllCommunity, getMyCommunity, joinCommunity, newCommunity } from "../../services/communityService";
import { toast } from "react-toastify";
// import { toast } from "react-toastify";

interface IInitialvalue {
    community: ICommunity[] | [];
    myCommunity: ICommunity[] | []
    isLoading: boolean;
    isError: boolean;
    status: number | null;
    errorMessage: string;
    isSuccess: boolean;
}

const initialState: IInitialvalue = {
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
            state.myCommunity = [{ ...action.payload?.community, members: action.payload?.members }, ...state.myCommunity]
            state.isSuccess = true;
            toast.success("New community created");
        })
        builder.addCase(newCommunity.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            const error = action.payload as {
                message: string,
                status: number
            };
            state.errorMessage = error.message;
            state.status = error.status;

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
        builder.addCase(getMyCommunity.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            const error = action.payload as {
                message: string,
                status: number
            };
            state.errorMessage = error.message;
            state.status = error.status;

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
        builder.addCase(getAllCommunity.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            const error = action.payload as {
                message: string,
                status: number
            };
            state.errorMessage = error.message;
            state.status = error.status;

        })

        //join community
        builder.addCase(joinCommunity.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(joinCommunity.fulfilled, (state, action) => {
            state.isLoading = false;
            state.community = state.community.map((item) => {
                if (item._id === action.payload.newMember.community_id) {
                    item.members.push(action.payload.newMember);
                }
                return item;
            })
            state.myCommunity = [{ ...action.payload?.community, members: action.payload?.members }, ...state.myCommunity]
            state.isSuccess = true;
        })
        builder.addCase(joinCommunity.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            const error = action.payload as {
                message: string,
                status: number
            };
            state.errorMessage = error.message;
            state.status = error.status;

        })
        //accept join request
        builder.addCase(acceptJoinRequest.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(acceptJoinRequest.fulfilled, (state, action) => {
            state.isLoading = false;
            state.community = state.community.map((item) => {
                if (item._id === action.payload.member.community_id) {
                    item.members.map((member) => {
                        if (member.user_id === action.payload.member.user_id) {
                            member.status = action.payload.member.status
                        }
                        return member;
                    })
                }
                return item;
            })

            state.isSuccess = true;
        })
        builder.addCase(acceptJoinRequest.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            const error = action.payload as {
                message: string,
                status: number
            };
            state.errorMessage = error.message;
            state.status = error.status;

        })
        //accept join request
        builder.addCase(editCommunity.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(editCommunity.fulfilled, (state, action) => {
            state.isLoading = false;
            state.myCommunity = state.myCommunity.map((item) => {
                if (item._id === action.payload.community._id) {
                    item = {
                        ...item,
                        community_name: action.payload.community.community_name,
                        topic: action.payload.community.topic,
                        about: action.payload.community.about,
                        privacy: action.payload.community.privacy,
                        icon: action.payload.community.icon
                    }
                }
                return item;
            })
            state.isSuccess = true;
            toast.success("Community edited");
        })
        builder.addCase(editCommunity.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            const error = action.payload as {
                message: string,
                status: number
            };
            state.errorMessage = error.message;
            state.status = error.status;

        })
    }
})

export const { resetCommunity } = communitySlice.actions;

export default communitySlice.reducer;
