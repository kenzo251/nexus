import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import SpellsApiService from '../Services/spells-api-service';
import { Helmet } from "react-helmet";
import TokenService from '../Services/token-service';

import Chapter1 from "./NewUserFlow/Level1";
import Chapter2 from "./NewUserFlow/Level2";
import Chapter3 from "./NewUserFlow/Level3";
import LastChapter from "./NewUserFlow/LastLevel";


// Badge -> Boolean
function finished(badge) {
  console.log(badge)
  return badge.name.startsWith("Finished:")
}

// Badges -> Integer between 2 - infinity
// If you're not logged in, you see Ch 1
function currentChapterNum(badges) {
  return badges.filter(finished).length + 2;
}


const LandingPage = (props) => {
  const [hasFetchedBadges, setHasFetchedBadges] = useState(false);
  const [badges, setBadges] = useState(undefined);

  const chapters = [
    <Chapter2
      setBadges={setBadges}
      badges={badges}
      badgeName={"Finished:ch2:Beyond-the-Gate"}
    />,
    <Chapter3
      setBadges={setBadges}
      badges={badges}
      badgeName={"Finished:ch3:Light-Mage-or-Dark-Mage"}
    />,
    <LastChapter setBadges={ setBadges } badges={ badges }/>
  ];

  useEffect(() => {
    SpellsApiService.getBadgesByUser("me")
      .then(badges => {
        setHasFetchedBadges(true);
        setBadges(badges);
      })
  }, [])

  let currentChapter = undefined;
  if (hasFetchedBadges && badges !== undefined && badges.length !== undefined) {
    currentChapter = chapters[currentChapterNum(badges) - 2];
  }
  
  return (
    <>
      <Helmet>
        <title>CodeSpells Nexus</title>
        <meta name="description" content="Welcome to the Nexus! If you want to write and save spells that run on CodeSpells video games, you're in the right place." />
      </Helmet>
      {TokenService.hasAuthToken() ?
        currentChapter :
        <Chapter1 setBadges={ setBadges } />
      }
    </>
  );
}

export default LandingPage;