import { useState } from "react"


import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Container,
    Avatar,
    Button,
    Tooltip,
    MenuItem,
} from "@mui/material"
import { useUser } from "../../context/user-context"
import {Route, Routes,  Link } from "react-router-dom"


import AdbIcon from "@mui/icons-material/Adb"
import { BooksList } from "../books-list/books-list"
import { LoginDialog } from "../login/login-dialogue"
import { SignupDialog } from  "../signup/signup-dialogue"
import { BookForm } from "../book-form/book-form"
import { Book } from "../book/book"
import { WithLoginProtector } from "../access-control/login-protector"
import { WithAdminProtector } from "../access-control/admin-protector"


export const AppLayout = () => {

    const [openLoginDialog, setOpenLoginDialog] = useState(false)
    const [openSignupDialog, setOpenSignupDialog] = useState(false)
    const [anchorElUser, setAnchorElUser] = useState(null)
    const { user, loginUser,registerUser, logoutUser } = useUser()
    
    

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget)
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    }

    const handleLoginSubmit = (username, password) => {
        loginUser(username, password)
        setOpenLoginDialog(false)
    }

    const handleLoginClose = () => {
        setOpenLoginDialog(false)
    }
    const handleSignupSubmit = (username, password,checked) => {
        registerUser(username, password,checked)
        setOpenSignupDialog(false)
    }

    const handleSignupClose = () => {
        setOpenSignupDialog(false)
    }

    const handleLogout = () => {
        logoutUser()
        handleCloseUserMenu()
    }

 

    return (
        <>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <AdbIcon sx={{ display: "flex", mr: 1 }} />
                        <Link to="/" style={{ textDecoration: "none", flexGrow: 1 }}>
                            <Typography
                                variant="h6"
                                noWrap
                                sx={{
                                    mr: 2,
                                    display: "flex",
                                    fontFamily: "monospace",
                                    fontWeight: 700,
                                    letterSpacing: ".3rem",
                                    color: "white",
                                }}
                            >
                                BrettMan Library
                            </Typography>
                        </Link>
                        <Box
                            sx={{
                                flexGrow: 0,
                            }}
                        >
                            {user ? (
                                <>
                                    <Tooltip title="Open settings">
                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                            <Avatar> {user.username.charAt(0).toUpperCase()} </Avatar>
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        sx={{ mt: "45px" }}
                                        id="menu-appbar"
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: "top",
                                            horizontal: "right",
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: "top",
                                            horizontal: "right",
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >
                                        <MenuItem onClick={handleCloseUserMenu}>
                                            <Typography textAlign="center">Dashboard</Typography>
                                        </MenuItem>
                                        <MenuItem onClick={handleLogout}>
                                            <Typography textAlign="center">Logout</Typography>
                                        </MenuItem>
                                    </Menu>
                                </>
                            ) : (
                              <div style={{display: 'flex'}}> 
                              <Button style={{flex:1}}
                                onClick={() => {
                                    setOpenSignupDialog(true)
                                }}
                                sx={{ my: 2, color: "white", display: "block" }}
                            >
                                SignUp
                            </Button>



                                <Button style={{flex:1}}
                                    onClick={() => {
                                        setOpenLoginDialog(true)
                                    }}
                                    sx={{ my: 2, color: "white", display: "block" }}
                                >
                                    Login
                                </Button>
                                </div>
                                
                            )}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
           
        
            <Routes>
            <Route 
                     path="/"
                    element={
                        <BooksList />
                    }
                    
                />
                <Route
                    path="/books/:bookIsbn"
                    element={
                        <WithLoginProtector>
                            <Book />
                        </WithLoginProtector>
                    }
                />
                <Route 
                      path="/admin/books/add"
                    element={
                        <WithLoginProtector>
                            <WithAdminProtector>
                                <BookForm />
                            </WithAdminProtector>
                        </WithLoginProtector>
                    }
                    
                />
                <Route
                    path="/admin/books/:bookIsbn/edit"
                    element={<WithLoginProtector>
                        <WithAdminProtector>
                            <BookForm />
                        </WithAdminProtector>
                    </WithLoginProtector>}
                   
                />
               
            </Routes>
         
            
            <LoginDialog
                open={openLoginDialog}
                handleSubmit={handleLoginSubmit}
                handleClose={handleLoginClose}
            />
            <SignupDialog
                open={openSignupDialog}
                handleSubmit={handleSignupSubmit}
                handleClose={handleSignupClose}
            />
        </>
    )
}