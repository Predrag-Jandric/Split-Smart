function GroupsEachMember({ member }) {
  return (
    <section className="flex flex-col w-20 items-center text-center">
      <img
        className="object-cover w-[4rem] h-[4rem] rounded-full"
        src={member.img}
        alt={member.name}
      />

      <p className="font-bold text-base">{member.name}</p>
    </section>
  );
}

export default GroupsEachMember;
