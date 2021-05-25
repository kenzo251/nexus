import React, { useEffect, useState } from 'react';
import Title from './Dashboard/Title';
import SpellsApiService from '../Services/spells-api-service';
import Spellbook from './Spellbook';
import Pagination from '@material-ui/lab/Pagination';
import {SearchBar} from '../Util.js'
import useStyles from '../styles.js';
import IconButton from '@material-ui/core/IconButton';
import MoodBadIcon from '@material-ui/icons/MoodBad';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory } from "react-router-dom";

const UserProfile = (props) => {
  const classes = useStyles();
  const [user, setUser] = useState(undefined)
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [currentPage, setCurrentPage] = useState(1)
  const [search, setSearch] = React.useState('');
  const [follow, setFollow] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  let history = useHistory();

  let path = window.location.pathname

  useEffect(() => {
    let isMounted = true
    const { id } = props.match.params

    SpellsApiService.getUserById(id, currentPage, search)
      .then(user => {
        if(isMounted) setUser(user)
      })
      return () => {
        isMounted = false
      }
  },[currentPage, search, path])

  const updateFollow = () => {
    setIsLoading(true)
    setTimeout(() => {setFollow(!follow)}, 1000)
    setTimeout(() => {setIsLoading(false)}, 1000)
  }
//logged in for profile page
  return (
    user ?
      <>
      {/* //logged in for profile page */}
        <div className={classes.userProfileHeadBar}>
          <div className={classes.userProfileHeadLeft}>
            {isLoading 
              ? 
                <CircularProgress size={48}/>
              :
                follow 
                  ? 
                    <Tooltip title={`Add ${user.username}`}>
                      <IconButton aria-label="add-mage" onClick={() => updateFollow()}>
                        <PersonAddIcon />
                      </IconButton>
                    </Tooltip>
                  :
                    <Tooltip title={`Remove ${user.username}`}>
                      <IconButton aria-label="remove-mage" onClick={() => updateFollow()}>
                        <PersonAddDisabledIcon />
                      </IconButton>
                    </Tooltip>
                
            }  
          </div>
          <div className={classes.userProfileHeadTitle}>{ user.username.charAt(user.username.length-1).toLowerCase() === "s"  ? `${user.username}' Mage Page` : `${user.username}'s Mage Page`}</div>
          <div className={classes.userProfileHeadRight}><SearchBar setSearch={setSearch}/></div>
        </div>

        <Spellbook spells={user.spells}/>
        
        <div className={classes.userProfileRoot}>
          <Pagination count={Math.ceil(user.total / rowsPerPage)}
            onChange={(event, page) => {setCurrentPage(page)}}
          />
        </div>
      </>
    : ''
  );
};

export default UserProfile;
