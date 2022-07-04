import React, { useState } from "react";

import Favorite from "./Favorite";

//REDUX
import { useSelector } from 'react-redux';

import {
  ProSidebar,
  Menu,
  SidebarHeader,
  SidebarContent
} from "react-pro-sidebar";

import "react-pro-sidebar/dist/css/styles.css";
import { InputGroup, FormControl } from "react-bootstrap";
import _ from "lodash";


const Favorites:React.FC = ():JSX.Element => 
{

  const favorites:string[] = useSelector<any, string[]>(state => state.favorites); 

  const [inputText, setInputText] = useState("");
    
  const inputHandler = (e: { target: { value: string; }; }) => {
      //convert input text to lower case
      let lowerCase:string = e.target.value.toLowerCase();
      setInputText(lowerCase);
  };
  
  const filteredFavorites = _.filter(favorites, function(item){
    return item.toLowerCase().includes(inputText.toLowerCase());
  })

  return (
    <ProSidebar
      rtl={false}
      toggled={false}
      breakPoint="md"
      collapsed={false}>

      <SidebarHeader>
        <div className="sidebar-header">
          <p className="text-center user-name text-white mb-2 pt-2">Favorite Countries</p>
        </div>
      </SidebarHeader>

      <SidebarContent>

        <InputGroup className="mb-3">
                <FormControl
                placeholder="Search favorite"
                aria-label=""
                aria-describedby=""
                onChange={inputHandler}
                />
        </InputGroup>

        <Menu iconShape="circle">
          {
            filteredFavorites.map(function(item, i)
            {
              return <Favorite item={item}  key={item}/>
            })
          }
        </Menu>

      </SidebarContent>
    </ProSidebar>
  );
};

export default Favorites;
