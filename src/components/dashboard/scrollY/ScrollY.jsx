import { useEffect, useRef, useState } from "react";
import styles from "./scrollY.module.css";

const ScrollY = ({ scrollContainerRef }) => {
  const scrollbarRef = useRef(null);
  const thumbRef = useRef(null);
  const dragging = useRef(null);
  const startY = useRef(0);
  const [thumbHeight, setThumbHeight] = useState(0);
  const thumbHeightRef = useRef(0); // 최신 값 저장용
  const [scrollTop, setScrollTop] = useState(0);
  
  useEffect(() => {
    updateScrollbar();
    updateThumbPosition();
    window.addEventListener("resize", updateScrollbar);
    window.addEventListener("resize", updateThumbPosition);
    return () => {
      window.removeEventListener("resize", updateScrollbar);
      window.removeEventListener("resize", updateThumbPosition);
    }
  }, []);

  const updateScrollbar = () => {
    const content = scrollContainerRef.current;
    const scrollbar = scrollbarRef.current;
    if (!content || !scrollbar) return;
    const contentHeight = content.scrollHeight;
    const visibleHeight = content.clientHeight;
    const scrollbarHeight = scrollbar.clientHeight;
    const newThumbHeight = (visibleHeight / contentHeight) * scrollbarHeight;
    setThumbHeight(newThumbHeight); // UI 업데이트를 위해 상태 변경
    thumbHeightRef.current = newThumbHeight; // 최신 값 저장
  };

  const updateThumbPosition = () => {
    const content = scrollContainerRef.current;
    const scrollbar = scrollbarRef.current;
    if (!content || !scrollbar) return;
    
    const scrollRatio = content.scrollTop / (content.scrollHeight - content.clientHeight);
    const thumbTop = scrollRatio * (scrollbar.clientHeight - thumbHeightRef.current);
    thumbRef.current.style.top = `${thumbTop}px`;
  };

  const startDragging = (e) => {
    dragging.current = true;
    startY.current = e.clientY;
    setScrollTop(scrollContainerRef.current.scrollTop);
    document.addEventListener("mousemove", handleDragging);
    document.addEventListener("mouseup", stopDragging);
  };

  const handleDragging = (e) => {
    if (!dragging.current) return;
    const deltaY = e.clientY - startY.current;
    const scrollPercentage = deltaY / scrollbarRef.current.clientHeight;
    scrollContainerRef.current.scrollTop = scrollTop + scrollPercentage * scrollContainerRef.current.scrollHeight;
    updateThumbPosition();
    setScrollTop(scrollContainerRef.current.scrollTop);
  };

  const stopDragging = () => {
    dragging.current = false;
    document.removeEventListener("mousemove", handleDragging);
    document.removeEventListener("mouseup", stopDragging);
  };

  return (
    <div className={styles.container}>
      <div className={styles.customScrollbar} ref={scrollbarRef}>
        <div
          className={styles.scrollThumb}
          ref={thumbRef}
          style={{ height: `${thumbHeight}px` }}
          onMouseDown={startDragging}
        />
      </div>
      <div className={styles.trash} />
    </div>
  );
};

export default ScrollY;
