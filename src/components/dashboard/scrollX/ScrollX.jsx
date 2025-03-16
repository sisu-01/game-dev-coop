import { useEffect, useRef, useState } from "react";
import styles from "./scrollX.module.css";

const ScrollX = ({ startAt, scrollContainerRef, calendarContainerRef }) => {
  const scrollbarRef = useRef(null);
  const thumbRef = useRef(null);
  const dragging = useRef(null);
  const startX = useRef(0);
  const [thumbWidth, setThumbWidth] = useState(0);
  const thumbWidthRef = useRef(0); // 최신 값 저장용
  const [scrollLeft, setScrollLeft] = useState(0);
  
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

  useEffect(() => {
    if (scrollContainerRef.current) {
      const today = new Date(); // 현재 날짜
      const diffInMs = today - startAt; // 밀리초 차이
      const leftValue = ((diffInMs / (1000 * 60 * 60 * 24)) * 40) - 11; // 일(day) 단위 변환 후 40배
      smoothScrollTo(scrollContainerRef.current, calendarContainerRef.current, leftValue, 300); // 300ms 동안 스크롤 이동
      setScrollLeft(leftValue);
    }
  }, []);

  const smoothScrollTo = (element1, element2, target, duration) => {
    const start1 = element1.scrollLeft;
    const change1 = target - start1;
    const start2 = element2.scrollLeft;
    const change2 = target - start2;
    const startTime = performance.now();
    const animateScroll = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1); // 0 ~ 1 사이 값
  
      element1.scrollLeft = start1 + change1 * easeInOutQuad(progress);
      element2.scrollLeft = start2 + change2 * easeInOutQuad(progress);
      updateThumbPosition(); // thumb 위치도 부드럽게 업데이트
  
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };
    requestAnimationFrame(animateScroll);
  };
  const easeInOutQuad = (t) => {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  };

  const updateScrollbar = () => {
    const content = scrollContainerRef.current;
    const scrollbar = scrollbarRef.current;
    if (!content || !scrollbar) return;
    const contentWidth = content.scrollWidth;
    const visibleWidth = content.clientWidth;
    const scrollbarWidth = scrollbar.clientWidth;
    const newThumbWidth = (visibleWidth / contentWidth) * scrollbarWidth;
    setThumbWidth(newThumbWidth); // UI 업데이트를 위해 상태 변경
    thumbWidthRef.current = newThumbWidth; // 최신 값 저장
  };
  const updateThumbPosition = () => {
    const content = scrollContainerRef.current;
    const scrollbar = scrollbarRef.current;
    if (!content || !scrollbar) return;
    
    const scrollRatio = content.scrollLeft / (content.scrollWidth - content.clientWidth);
    const thumbLeft = scrollRatio * (scrollbar.clientWidth - thumbWidthRef.current);
    thumbRef.current.style.left = `${thumbLeft}px`;
  };

  const startDragging = (e) => {
    dragging.current = true;
    startX.current = e.clientX;
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    document.addEventListener("mousemove", handleDragging);
    document.addEventListener("mouseup", stopDragging);
  };
  const handleDragging = (e) => {
    if (!dragging.current) return;
    const deltaX = e.clientX - startX.current;
    const scrollPercentage = deltaX / scrollbarRef.current.clientWidth;
    scrollContainerRef.current.scrollLeft = scrollLeft + scrollPercentage * scrollContainerRef.current.scrollWidth;
    calendarContainerRef.current.scrollLeft = scrollLeft + scrollPercentage * scrollContainerRef.current.scrollWidth;
    updateThumbPosition();
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };
  const stopDragging = () => {
    dragging.current = false;
    document.removeEventListener("mousemove", handleDragging);
    document.removeEventListener("mouseup", stopDragging);
  };

  return (
    <div style={{display: "flex"}}>
      <div className={styles.customScrollbar} ref={scrollbarRef} >
        <div className={styles.scrollThumb}
          ref={thumbRef}
          style={{ width: `${thumbWidth}px` }}
          onMouseDown={startDragging}
        />
      </div>
      <div className={styles.trash} />
    </div>
  );
}

export default ScrollX;