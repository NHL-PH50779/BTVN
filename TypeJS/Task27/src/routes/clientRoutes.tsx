import React, { Component } from 'react'
import TodoList from '../components/TodoList'
import routerr from '../components/routerr'

const clientRoutes = [
    {
        path: "/",
        children: [
            {path:"list",Component:TodoList},
            {path:"listss",Component:routerr}
            
        ]
    }
]


export default clientRoutes
