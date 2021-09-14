import React, { useEffect,useState } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import MoreIcon from '@material-ui/icons/MoreVert';
import {postData,getData,ServerURL} from "../FetchNodeServices"
import Button from '@material-ui/core/Button';
import Delete from '@material-ui/icons/Delete';

import {useSelector,useDispatch} from 'react-redux'

import clsx from 'clsx';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Divider from '@material-ui/core/Divider';


const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
   
  list: {
    width: 350,
  },
  fullList: {
    width: 'auto',
  },

}));

export default function Header(props) {
  const classes = useStyles();

  var cart=useSelector(state=>state.cart)
  var keys=Object.keys(cart)

  var values=Object.values(cart)

  var totalamt=values.reduce(calculation,0)

  function calculation(a,b){
    var price=b.offer>0?b.offer*b.qtydemand*b.duration:b.rentamt*b.qtydemand*b.duration
    return a+price
  }

  var totalsaving=values.reduce(calculationsaving,0)

  function calculationsaving(a,b){
    var price=(b.rentamt-b.offer)*b.qtydemand*b.duration;
    return a+price
  }

  var actualamt=values.reduce(actualcalculation,0)

  function actualcalculation(a,b){
    var price=b.rentamt*b.qtydemand*b.duration;
    return a+price
  }
  
  var dispatch=useDispatch()

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const [listCategory,setListCategory] =useState([]) 
  const [listSubCategory,setListSubCategory] =useState([])
  const [anchorMEl, setAnchorMEl] = React.useState(null);


////////////////////////////////////////////////////////Drawer//////////////////////////////////////////////////////////////////////////////////////

  
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >

      <div style={{display:'flex',flexDirection:'row',width:345,padding:2 }}>
        <div style={{padding:5,display:'flex',alignItems:'center'}} >
          <ShoppingCart />
          <div style={{fontSize:16,fontWeight:'bold',letterSpacing:1,padding:3,display:'flex',alignItems:'center'}}>{keys.length} Items</div>
        </div>
        <div  style={{fontSize:16,fontWeight:'bold',letterSpacing:1,padding:3,display:'flex',alignItems:'center',width:230,justifyContent:'flex-end'}}>
          Total Amount:<span>&#8377;</span> {totalamt}
        </div>
      </div>

      <Divider />

      {showCart()}

      <Divider />

      {paymentDetails()}

    </div>
  );

  const showCart=()=>{
    return values.map((item)=>{
      return(
        
    <div style={{display:'flex',flexDirection:'row',width:345,padding:2 }}>

      <div style={{padding:5,display:'flex',alignItems:'center'}} >
        <img src={`${ServerURL}/images/${item.icon}`} width='120' />
      </div>
      
      <div style={{width:270,display:'flex',flexDirection:'column',justifyContent:'left',alignSelf:'center'}}>
      <div style={{fontSize:10,fontWeight:'bold',padding:2}} >
        {item.subcategoryname.length<=20?item.subcategoryname.toUpperCase():item.subcategoryname.toUpperCase().substring(0,18)+".."}
       </div>

      <div style={{fontSize:10, padding:2}}>
        Day Price: <s>&#8377; {item.rentamt}</s> <span><b>&#8377; {item.offer}</b></span>
      </div>

      <div style={{fontSize:10,padding:2}}>
        <span style={{color:'green'}}><b> You Save </b></span> 
        <b>&#8377; {item.rentamt-item.offer} </b>
      </div>

      <div style={{fontSize:10,padding:2}}>
        <b>{item.qtydemand} x {item.offer>0?
          (<><span>&#8377; {item.offer}</span> x <span>{item.duration} Days</span></>):(<span>&#8377; {item.rate}</span>)}
        </b>
        <span><Delete style={{fontSize:18,marginLeft:25,color:'red'}} onClick={()=>handleDelete(item)} /></span>
      </div>

      </div>

      <div  style={{fontSize:10,fontWeight:'bold',letterSpacing:1,padding:3,display:'flex',width:80,justifyContent:'flex-end',flexDirection:'column',alignSelf:'center'}}>
        {item.offer>0?
        (<div><span>&#8377;</span> {item.offer*item.qtydemand*item.duration}</div>):(<div><span>&#8377;</span> {item.rate*item.qtydemand*item.duration}</div>)}
        </div>

    </div>

      )
    })
  }

  const handleDelete=(item)=>{
    dispatch({type:'REMOVE_CART',payload:[item.subcategoryid]})
  }

  const paymentDetails=()=>{
    return(
      <div style={{display:'flex',flexDirection:'column'}}>
        <div style={{fontSize:18,fontWeight:'bold',letterSpacing:2,display:'flex',padding:10,justifyContent:'center',alignItems:'center'}}>
          Payment Details
        </div>
        <Divider />

        <div style={{display:'flex',flexDirection:'row'}}>
          <div style={{fontSize:14,fontWeight:'400',padding:5}}>
            Total Amount:
          </div>
          <div style={{fontSize:14,fontWeight:'bold',padding:5,textAlign:'right',marginLeft:'auto'}}>
            &#8377; {actualamt}
          </div>
        </div>

        <div style={{display:'flex',flexDirection:'row'}}>
          <div style={{fontSize:14,fontWeight:'400',padding:5}}>
            Total Saving:
          </div>
          <div style={{fontSize:14,fontWeight:'bold',padding:5,textAlign:'right',marginLeft:'auto'}}>
            &#8377; {totalsaving}
          </div>
        </div>

        <div style={{display:'flex',flexDirection:'row'}}>
          <div style={{fontSize:14,fontWeight:'400',padding:5}}>
            Delivery Charges:
          </div>
          <div style={{fontSize:14,fontWeight:'bold',padding:5,textAlign:'right',marginLeft:'auto'}}>
            &#8377; {0}
          </div>
        </div>
        <Divider />

        <div style={{display:'flex',flexDirection:'row'}}>
          <div style={{fontSize:14,fontWeight:'400',padding:5}}>
            Amount Pay:
          </div>
          <div style={{fontSize:14,fontWeight:'bold',padding:5,textAlign:'right',marginLeft:'auto'}}>
            &#8377; {totalamt}
          </div>
        </div>
        <Divider />

        <div style={{padding:10}}>   
          <Button onClick={()=>props.history.push({'pathname':"/mobileregistration"})} variant="contained" style={{background:'#1e6b76',color:'#FFF',width:329}} >Proceed</Button>
        </div>  

      </div>
    )
  }



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////Menu Design/////////////////////////////////////////////////////////////////////////////////////////////////

const fetchAllCategory=async()=>{
    var result=await getData("categories/displayall")
    setListCategory(result)
}

const fetchSubCategory=async(cid)=>{
    var body={categoryid:cid}
    var result= await postData("subcategory/displaysubcategorybycategoryid",body)
    setListSubCategory(result);
}

const handleMenuClick=async(event)=>{
    
    setAnchorMEl(event.currentTarget);
    fetchSubCategory(event.currentTarget.value)
} 


useEffect(function(){
    fetchAllCategory()
},[])

const menuCategoryItems=()=>{
    return listSubCategory.map((item)=>{
        return (
            <MenuItem onClick={handleClose}>
              {item.subcategoryname}
            </MenuItem>
        )
    })

}

const menuCategory=()=>{
    return listCategory.map((item)=>{
        return(  
            <Button style={{color:'#000',marginRight:25}}
              value={item.categoryid}
               onClick={(event)=>handleMenuClick(event)} 
               >
              {item.categoryname}
            </Button>
        )
    })
}


  const handleClose = () => {
    setAnchorMEl(null);
  };




////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton onClick={toggleDrawer('right', true)} aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={keys.length} color="secondary">
            <ShoppingCart />
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>SignIn/SignUp</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position='sticky' style={{background: "linear-gradient(90deg, #fff 54.69%, #1e6b7b 100%)"}} >
        <Toolbar>   
          <Typography className={classes.title} variant="h8" noWrap>
            <img src="/gamelogo1.jpg" height="80%"  />
          </Typography>

          
          {/* <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div> */}
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
          <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
            <IconButton onClick={toggleDrawer('right', true)} aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={keys.length} color="secondary">
                <ShoppingCart style={{fontSize:30}} />  
              </Badge>
            </IconButton>
            <a style={{fontSize:19,letterSpacing:3}}> Cart</a>
          </div>
            
          <div style={{display:"flex",flexDirection:"row",alignItems:"center",margin:10}}>  
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle style={{fontSize:33,marginRight:10}} /> 
            </IconButton>
            <a style={{fontSize:19,letterSpacing:3}}> SignIn/SignUp</a>  
          </div>

          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      {/* <AppBar position="static" style={{background:'#FFF',}}>
        <Toolbar variant="dense">

          
          <div style={{display:'flex',flexDirection:'row', marginLeft:100}} >
              {menuCategory()}

             <Menu
                id="simple-menu"
                anchorEl={anchorMEl}
                keepMounted
                open={Boolean(anchorMEl)}
                onClose={handleClose}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical:"bottom", horizontal:"center" }}
                transformOrigin={{ vertical:"top", horizontal:"center" }} 
                >

                {menuCategoryItems()}
             </Menu>

            </div>

        </Toolbar>
      </AppBar> */}

      {renderMobileMenu}
      {renderMenu}

      <div>
        <React.Fragment key={'right'}>
          <SwipeableDrawer
            anchor={'right'}
            open={state['right']}
            onClose={toggleDrawer('right', false)}
          
          >
            {list('right')}
          </SwipeableDrawer>
        </React.Fragment>
      
    </div>


    </div>
  );
}
