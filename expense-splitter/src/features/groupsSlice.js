import { createSlice } from "@reduxjs/toolkit";
import unknownPerson from "../assets/unknownPerson.jpg";

const calculateContributions = (group) => {
  const memberCount = group.members.length;
  if (memberCount > 0) {
    let totalContribution = 0;
    const baseContribution = Math.floor(100 / memberCount);
    const contributions = group.members.map(() => baseContribution);
    totalContribution = baseContribution * memberCount;

    let remaining = 100 - totalContribution;

    while (remaining !== 0) {
      const randomIndex = Math.floor(Math.random() * memberCount);
      const adjustment = remaining > 0 ? 1 : -1;
      contributions[randomIndex] += adjustment;
      remaining -= adjustment;
    }

    group.members.forEach((member, index) => {
      member.contribution = contributions[index];
    });
  }
};

const initialState = {
  groups: [],
};

const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    addGroup: (state, action) => {
      state.groups.push(action.payload);
    },
    removeGroup: (state, action) => {
      state.groups = state.groups.filter(
        (group) => group.id !== action.payload
      );
    },
    addMember: (state, action) => {
      const { groupId, member } = action.payload;
      const group = state.groups.find((group) => group.id === groupId);
      if (group) {
        group.members.push({
          id: Date.now(),
          ...member,
          image: member.image || unknownPerson,
        });
        calculateContributions(group);
      }
    },
    removeMember: (state, action) => {
      const { groupId, memberId } = action.payload;
      const group = state.groups.find((group) => group.id === groupId);
      if (group) {
        group.members = group.members.filter(
          (member) => member.id !== memberId
        );
        calculateContributions(group);
      }
    },
    updateGroupBudget: (state, action) => {
      const { groupId, totalBudget } = action.payload;
      const group = state.groups.find((group) => group.id === groupId);
      if (group) {
        group.totalBudget = totalBudget;
      }
    },
    updateGroupExpense: (state, action) => {
      const { groupId, totalExpense } = action.payload;
      const group = state.groups.find((group) => group.id === groupId);
      if (group) {
        group.totalExpense = totalExpense;
        calculateContributions(group);
      }
    },
    updateMemberContribution: (state, action) => {
      const { groupId, contributions } = action.payload;
      const group = state.groups.find((group) => group.id === groupId);
      if (group) {
        group.members.forEach((member) => {
          if (contributions[member.id] !== undefined) {
            member.contribution = contributions[member.id];
          }
        });
      }
    },
    updateGroupName: (state, action) => {
      const { groupId, newName } = action.payload;
      const group = state.groups.find((group) => group.id === groupId);
      if (group) {
        group.name = newName;
      }
    },
    updateGroupDescription: (state, action) => {
      const { groupId, newDescription } = action.payload;
      const group = state.groups.find((group) => group.id === groupId);
      if (group) {
        group.description = newDescription;
      }
    },
    updateGroupImage: (state, action) => {
      const { groupId, newImage } = action.payload;
      const group = state.groups.find((group) => group.id === groupId);
      if (group) {
        group.image = newImage;
      }
    },
  },
});

export const {
  addGroup,
  removeGroup,
  addMember,
  removeMember,
  updateGroupBudget,
  updateGroupExpense,
  updateMemberContribution,
  updateGroupName,
  updateGroupImage,
  updateGroupDescription,
} = groupsSlice.actions;
export default groupsSlice.reducer;
