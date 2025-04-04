// these are all the images for groups and members of the groups
import group1 from "../../assets/group1.jpg";
import group2 from "../../assets/group2.jpg";
import group3 from "../../assets/group3.jpg";
import group4 from "../../assets/group4.jpg";
import group5 from "../../assets/group5.jpg";
import group6 from "../../assets/group6.jpg";
import group7 from "../../assets/group7.jpg";
import group8 from "../../assets/group8.jpg";
import group9 from "../../assets/group9.png";

import person2 from "../../assets/person2.jpg";
import person5 from "../../assets/person5.jpg";
import person6 from "../../assets/person6.jpg";
import person7 from "../../assets/person7.jpg";
import person8 from "../../assets/person8.jpg";
import person10 from "../../assets/person10.jpg";
import person11 from "../../assets/person11.jpg";
import person14 from "../../assets/person14.jpg";
import person15 from "../../assets/person15.jpg";
import ourLogo from "../../assets/ourLogo.png";

export const special = ourLogo;

export const imagesPeople = [
  person2,
  person5,
  person6,
  person7,
  person8,
  person14,
  person11,
  person10,
  person15,
];

export const images = [
  group1,
  group2,
  group3,
  group4,
  group5,
  group6,
  group7,
  group8,
  group9,
];

export const getRandomImage = () => {
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
};
