## OVERALL

- Pick and implement inverted colors of the whole theme into DARK MODE
- when project is finished, write new readme from scratch !
- add favicon to the browser tab
- border radius should be equal for ALL sections, inputs, btns etc, use tailwind custom class for testing and changing ALL of them from a single line
- make modal look visually pretty
- discuss with Cash about difference of animations on group page for add members and home page add group VS add budget and edit contributions. REFINE these two types or one type of animation/s

OPTIONAL

- add a fun cube that when clicked will change primary color across whole app, liek a random theme switcher

---

## GROUP PAGE

- make the gaps between elements equal
- make sure everything is responsive
- ensure all boxy elements have equal border radius
- ensure all boxy elements have the same box shadow prop
- add an intuitive hover effect for changing group image
- when editing group name, make sure its always capitalised and should be longer than X words
- when group is created, it starts with ZERO Total budget Total expense, so if these two are ZERO add a button that says "add", but if they already exist, that same button should say EDIT
- important buttons should be highlighted, and have active animation (like btn for adding members, editing contributions, adding Total budget and Total expense)
- when editing group name, make it so that cursor is ready immediately, you dont need to click initially to be able to edit name
- make the maximum number of group members 10 or something like that
- add a "add description" text that looks clickable under the group name so that users can add description that way instead of in group creation modal.
- when description is added, make it so that it can be eddited as well
- fix this in group chart legend "Mike - 15.129000000000001 $"
- make edit contribution modal have sliders

OPTIONAL

- when an image is selected for a group member, ERASE that image from the map so that different member cannot have the same image

---

## HOME PAGE

- make the gaps between elements equal
- make sure everything is responsive
- ensure all boxy elements have equal border radius
- ensure all boxy elements have the same box shadow prop
- make hovering on image have some sort of UX that lets the user know image is clickable
- make all input fields autoFocus when modal is opened

OPTIONAL

- when an image is selected for a group, ERASE that image from the map so that different group cannot have the same image

---

## DONE

- make search bar POP out visually more
- make sure search bar will filter groups that ONLY contain the input letter, meaning you dont need to type in any kind of order to get specific group
- remove "description" from the group creation modal
- when adding new group, simplify as much as possible, remove selecting budget and expense when CREATING new group
- make clicking on group image also takes you to that group id page
- add a nice modal for removing a group instead of just an alert
- when creating a group, when modal is opened make the input field at focus state immediately
- change contribution color array with nicer colors
- re-structured some folders
- "add group should have a nice infinite animation to guide users to creating new group"
