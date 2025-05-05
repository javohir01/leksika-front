import { useState, useEffect } from 'react'
import { Card, CardContent, ListItem, ListItemButton } from '@mui/material'
import api from './api'


const Tag = ({ tag }) => {
    return (
        <ListItem>
            <ListItemButton id={`/tag/${tag._id}`}>{tag._id} ({tag.count})</ListItemButton>
        </ListItem>
    )
}


export default Tag
