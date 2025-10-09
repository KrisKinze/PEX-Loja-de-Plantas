/* ============================================================ */
/* MENU STICKY */
/* ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    const abasMenu = document.getElementById('abasMenu');
    
    if (!abasMenu) return;
    
    const menuOffsetTop = abasMenu.offsetTop;
    const headerHeight = document.querySelector('header')?.offsetHeight || 0;
    
    const placeholder = document.createElement('div');
    placeholder.style.display = 'none';
    placeholder.style.height = abasMenu.offsetHeight + 'px';
    abasMenu.parentNode.insertBefore(placeholder, abasMenu);
    
    function handleScroll() {
        const scrollPosition = window.scrollY;
        
        if (scrollPosition >= menuOffsetTop - headerHeight) {
            abasMenu.classList.add('sticky-ativo');
            abasMenu.style.position = 'fixed';
            abasMenu.style.top = headerHeight + 'px';
            abasMenu.style.left = '0';
            abasMenu.style.right = '0';
            abasMenu.style.width = '100%';
            abasMenu.style.zIndex = '999';
            
            placeholder.style.display = 'block';
        } else {
            abasMenu.classList.remove('sticky-ativo');
            abasMenu.style.position = '';
            abasMenu.style.top = '';
            abasMenu.style.left = '';
            abasMenu.style.right = '';
            abasMenu.style.width = '';
            abasMenu.style.zIndex = '';
            
            placeholder.style.display = 'none';
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
});
