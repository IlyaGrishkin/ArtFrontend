import React, { useRef } from 'react';
import './Scroller.css'


export const ScrollableList = ({ items }) => {
    const listRef = useRef(null);

    const handleDragStart = (e) => {
        e.preventDefault()// Прекращаем стандартное поведение
        listRef.current.isDragging = true;
        listRef.current.startX = e.pageX - listRef.current.offsetLeft;
    };

    const handleDragStartTouch = (e) => {
        const pageX = e.changedTouches[0].pageX
        listRef.current.isDragging = true;
        listRef.current.startX = pageX - listRef.current.offsetLeft;
    };


    const handleDragEnd = (e) => {
        listRef.current.isDragging = false;
        
    };

    const handleDragMove = (e) => {
        if (!listRef.current.isDragging) return;
        const x = e.pageX - listRef.current.offsetLeft;
        const walk = (x - listRef.current.startX) * 0.05; // Определяем скорость прокрутки
        listRef.current.scrollLeft -= walk;
    };

    const handleDragMoveTouch = (e) => {
        if (!listRef.current.isDragging) return;
        const pageX = e.changedTouches[0].pageX
        const x = pageX - listRef.current.offsetLeft;
        const walk = (x - listRef.current.startX) * 0.05; // Определяем скорость прокрутки
        listRef.current.scrollLeft -= walk;
    };

    return (
        <div
            ref={listRef}
            className="scrollable-list"
            onMouseDown={handleDragStart}
            onTouchStart={handleDragStartTouch}

            onMouseUp={handleDragEnd}
            onTouchEnd={handleDragEnd}

            onMouseLeave={handleDragEnd}

            onMouseMove={handleDragMove}
            onTouchMove={handleDragMoveTouch}
            
            style={{
                display: 'flex',
                overflowX: 'hidden',
                height: "440px",
                cursor: 'grab',
                alignItems: 'center'
            }}
        >
            {items.map((item, index) => (
                <div key={index} style={{ flexShrink: 0, margin: '0', marginRight: '15px'}}>
                    {item}
                </div>
            ))}
        </div>
    );
};