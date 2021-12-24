// variables
const sidebar = document.querySelector('.sidebar')
const sidebarItemIcons = document.querySelectorAll('.sidebar-item-icon')
const sidebarItem = document.querySelectorAll('.sidebar-item')
const sidebarMenu = document.querySelector('.sidebar-menu')
const header = document.querySelector('.header')
const backdrop = document.querySelector('.backdrop')
const searchBtn = document.querySelector('.header-nav-item-icon.search')
const searchBox = document.querySelector('.search-box')
const closeSearchBtn = document.querySelector('.header-nav-item-icon.close-search')
const dropdownHasSubItems = document.querySelectorAll('.dropdown-has-sub')
const dropdownMenuAccount = document.querySelector('.dropdown-menu.account')
const accountDropdownBtn = document.querySelector('.header-nav-item-btn-custom')
const notifBtn = document.querySelector('.dropdown-btn')
const notifDropdown = document.querySelector('.dropdown-menu.notif')
const sidebarItemHasSub = document.querySelectorAll('.sidebar-item-content a')
const sidebarSubItems = document.querySelectorAll('.sidebar-item-content')
const subMenuArrowIcons = document.querySelectorAll('.sub-menu-arrow')

// eventListeners 
document.addEventListener('DOMContentLoaded', () => {
    changeActiveIconSidebar()
})

sidebarItem.forEach(item => {
    item.addEventListener('click', (event) => {

        if(!item.classList.contains('btn-sub')){
            event.preventDefault()

            // remove old active
            if(document.querySelector('.sidebar-item.active'))
                document.querySelector('.sidebar-item.active').classList.remove('active')

            // add active to this tab
            item.classList.add('active')

            // come set new icon for active
            resetActiveIconSidebar()
            changeActiveIconSidebar()

            document.querySelectorAll('.sidebar-item.btn-sub').forEach(item => {
                if(item.querySelector('.collapse.show')){
                    var collapseEl = new bootstrap.Collapse(item.querySelector('.collapse'))
                    collapseEl.toggle()
                }

                item.querySelector('.sub-menu-arrow').classList.remove('show')
            })

        }

    })
})

sidebarMenu.addEventListener('click', () => {
    // responsive menu
    if(window.innerWidth <= 991){

        if(sidebar.classList.contains('show')){
            sidebar.classList.remove('sidebar-mini')
            header.classList.remove('full-header')
            sidebar.classList.remove('show')
            backdrop.classList.remove('show')
        }
        else{
            sidebar.classList.remove('sidebar-mini')
            header.classList.remove('full-header')
            sidebar.classList.add('show')
            backdrop.classList.add('show')
        } 

        return
    }

    sidebar.classList.remove('show')
    backdrop.classList.remove('show')

    // larg menu
    toggleFullMenu()
})

backdrop.addEventListener('click', toggleBackdrop)

searchBtn.addEventListener('click', toggleShowSearch)

closeSearchBtn.addEventListener('click', toggleShowSearch)

dropdownHasSubItems.forEach(item => {
    item.addEventListener('click', () => {
        toggleShowSubDropdown(item)
    })
})

accountDropdownBtn.addEventListener('click', () => {
    if(dropdownMenuAccount.classList.contains('show'))
        dropdownMenuAccount.classList.remove('show')
    else
        dropdownMenuAccount.classList.add('show')    
})

document.addEventListener('click', (event) => {
    // if on the each section in the document clicked except dropdownAccount come hide the dropdown
    if(!event.target.closest('.dropdown.account')){
        dropdownMenuAccount.classList.remove('show')
        dropdownHasSubItems.forEach(item => {
            item.querySelector('.dropdown-sub-menu-items').classList.remove('show')
        })
    }

    if(!event.target.closest('.dropdown.notif')){
        // remove all dropdowns menu
        notifDropdown.classList.remove('show')
    }
})

notifBtn.addEventListener('click', () => {
    if(notifDropdown.classList.contains('show'))
        notifDropdown.classList.remove('show')
    else
        notifDropdown.classList.add('show')   
})

sidebarItemHasSub.forEach(item => {
    item.addEventListener('click', (event) => {
        event.preventDefault()
    })
})

sidebarSubItems.forEach((item, index) => {

    item.addEventListener('click', () => {    

        if(item.classList.contains('collapsed')){
            subMenuArrowIcons[index].classList.remove('show')
            item.parentElement.classList.remove('active')

            if(document.querySelector('.sidebar-item.active'))
                document.querySelector('.sidebar-item.active').classList.remove('active')

            // come set new icon for active
            resetActiveIconSidebar()
            changeActiveIconSidebar()

        }
        else {
            subMenuArrowIcons[index].classList.add('show')

            if(document.querySelector('.sidebar-item.active'))
                document.querySelector('.sidebar-item.active').classList.remove('active')

            item.parentElement.classList.add('active')

            // come set new icon for active
            resetActiveIconSidebar()
            changeActiveIconSidebar()

        }

        if(document.querySelector('.sidebar-item.btn-sub .collapse').classList.contains('show')){
            var collapseEl = new bootstrap.Collapse(document.querySelector('.sidebar-item.btn-sub .collapse.show'))
            collapseEl.toggle()
        }

    })

})

// functions
function resetActiveIconSidebar(){
    sidebarItemIcons.forEach((item) => {

        const content = item.querySelector('ion-icon').getAttribute('name')
        
        if(content == 'logo-web-component') return

        if(!item.querySelector('ion-icon').getAttribute('name').split('-').includes('outline')){
            item.querySelector('ion-icon').setAttribute('name', content + '-outline')
        }
    })
}

function changeActiveIconSidebar() {
    sidebarItemIcons.forEach((item) => {

        // if dont exist active come back 
        if(!item.parentElement.parentElement.classList.contains('active') &&
            !item.parentElement.parentElement.parentElement.classList.contains('active')){
            return
        }
        
        // come remove the outline from active icon
        let newItem = item.querySelector('ion-icon').getAttribute('name').split('-').map(item => {
            if(item == 'outline')
                item = ''
            return item
        }).join('-')

        if(newItem.slice(newItem.lastIndexOf('-') + 1).length <= 0)
            newItem =  newItem.slice(0, newItem.length - 1)

        // then come set new icon
        item.querySelector('ion-icon').setAttribute('name', newItem)
    })
}

function toggleFullMenu(){
    if(document.querySelector('.sidebar').classList.contains('sidebar-mini')){
        document.querySelector('.sidebar').classList.remove('sidebar-mini')
        document.querySelector('.header').classList.remove('full-header')
    }
    
    else {
        document.querySelector('.sidebar').classList.add('sidebar-mini')
        document.querySelector('.header').classList.add('full-header')
    }
}

function toggleBackdrop(){
    backdrop.classList.remove('show')
    sidebar.classList.remove('show')
}

function toggleShowSearch(){
    if(searchBox.classList.contains('active'))
        searchBox.classList.remove('active')
    else
        searchBox.classList.add('active')
}

function toggleShowSubDropdown(item){

    if(window.outerWidth >= 768) return

    if(document.querySelectorAll('.dropdown-sub-menu-items.show').length >= 1){
        if(document.querySelector('.dropdown-sub-menu-items.show') != item.querySelector('.dropdown-sub-menu-items'))
            document.querySelector('.dropdown-sub-menu-items.show').classList.remove('show')
    }

    if(item.querySelector('.dropdown-sub-menu-items').classList.contains('show'))
        item.querySelector('.dropdown-sub-menu-items').classList.remove('show')
    else
        item.querySelector('.dropdown-sub-menu-items').classList.add('show')
}
