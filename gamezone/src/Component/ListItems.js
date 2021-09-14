import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import CategoryInterface from './CategoryInterface'
import DisplayAllCategories from './DisplayAllCategories'
import SubCategoryInterface from './SubCategoryInterface'
import DisplayAllSubCategories from './DisplayAllSubCategories'
import GameInterface from './GameInterface'
import DisplayGames from './DisplayGames'
import AccessoriesInterface from './AccessoriesInterface'
import DisplayAccessories from './DisplayAccessories'
import TermAndCondition from './TermAndCondition';
import DisplayTermAndCondition from './DisplayTermAndCondition'
import Documents from './Documents'
import DisplayDocuments from './DisplayDocuments'
import ConsolePicture from './ConsolePicture'
import DisplayConsolePicture from './DisplayConsolePicture'
import GamesPicture from './GamesPicture'
import DisplayGamesPicture from './DisplayGamesPicture'
import AccessoriesPicture from './AccessoriesPicture'
import DisplayAccessoriesPicture from './DisplayAccessoriesPicture'



import {useHistory} from "react-router-dom";

export default function ListItems(props){

  var history = useHistory();

  const handleClick=(v)=>{
    props.setComponent(v)
  };

  const handleLogout=()=>{
    localStorage.clear()
    history.replace({ pathname:'./adminlogin'})
  };

  
return (
  <div>
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Categories" onClick={()=>handleClick(<CategoryInterface/>)} />
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="List Categories" onClick={()=>handleClick(<DisplayAllCategories />)} />
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Sub Category" onClick={()=>handleClick(<SubCategoryInterface/>)}/>
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="List SubCategories" onClick={()=>handleClick(<DisplayAllSubCategories />)}/>
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Game" onClick={()=>handleClick(<GameInterface />)} />
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="List Game" onClick={()=>handleClick(<DisplayGames />)} />
    </ListItem>
    
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Accessories" onClick={()=>handleClick(<AccessoriesInterface />)} />
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="List Accessories" onClick={()=>handleClick(<DisplayAccessories />)} />
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Term And Condition" onClick={()=>handleClick(<TermAndCondition />)} />
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="List Term And Condition" onClick={()=>handleClick(<DisplayTermAndCondition />)} />
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Documents" onClick={()=>handleClick(<Documents />)} />
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="List Documents" onClick={()=>handleClick(<DisplayDocuments />)} />
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Console Picture" onClick={()=>handleClick(<ConsolePicture />)} />
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="List Console Picture" onClick={()=>handleClick(<DisplayConsolePicture />)} />
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Games Picture" onClick={()=>handleClick(<GamesPicture />)} />
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="List Games Picture" onClick={()=>handleClick(<DisplayGamesPicture />)} />
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Accessories Picture" onClick={()=>handleClick(<AccessoriesPicture />)} />
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="List Accessories Picture" onClick={()=>handleClick(<DisplayAccessoriesPicture />)} />
    </ListItem>



    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="LogOut" onClick={()=>handleLogout()} />
    </ListItem>


  </div>



  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </div>
  </div>
);
}