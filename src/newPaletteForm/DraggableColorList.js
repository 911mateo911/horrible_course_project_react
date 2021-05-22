import React from 'react'
import { SortableContainer } from 'react-sortable-hoc'
import DraggableColorbox from './draggableColorbox'

const DraggableColorList = ({ colors, removeColor }) => {
    return (
        <div style={{ height: '100%' }} >
            {colors.map((col, i) => <DraggableColorbox
                name={col.name}
                color={col.color}
                index={i}
                key={col.name}
                handleClick={() => removeColor(col.name)}
            />)}
        </div>
    )
}

export default SortableContainer(DraggableColorList)