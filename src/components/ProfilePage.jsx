"use client"

import { useState, useRef, useEffect } from "react"
import { User, Edit2, Mail, Lock, Shield, LogOut, Camera, Check, X, AlertTriangle } from "lucide-react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Card, CardContent } from "../components/ui/card"
import { Separator } from "../components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Badge } from "../components/ui/badge"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
} from "../components/ui/dialog"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../components/ui/alert-dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"

export default function ProfilePage() {
    const [profile, setProfile] = useState({
        username: "eduuser",
        fullName: "Minta Felhasználó",
        email: "felhasznalo@example.com",
        status: "Aktív",
        avatarUrl: "/placeholder.svg?height=100&width=100",
        joinDate: "2023. január 15.",
        lastActive: "2 órája",
    })

    const [newEmail, setNewEmail] = useState("")
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [passwordStrength, setPasswordStrength] = useState(0)
    const fileInputRef = useRef(null)
    const [avatarHover, setAvatarHover] = useState(false)
    const [notification, setNotification] = useState(null)

    useEffect(() => {
        // Simple password strength calculator
        if (!newPassword) {
            setPasswordStrength(0)
            return
        }

        let strength = 0
        if (newPassword.length >= 8) strength += 1
        if (/[A-Z]/.test(newPassword)) strength += 1
        if (/[0-9]/.test(newPassword)) strength += 1
        if (/[^A-Za-z0-9]/.test(newPassword)) strength += 1

        setPasswordStrength(strength)
    }, [newPassword])

    // Custom notification function to replace toast
    const showNotification = (title, message, type = "success") => {
        setNotification({ title, message, type })

        // Auto-hide notification after 3 seconds
        setTimeout(() => {
            setNotification(null)
        }, 3000)
    }

    const handleAvatarUpload = (event) => {
        const file = event.target.files?.[0]
        if (file) {
            // In a real implementation, you would upload the file to a server
            const imageUrl = URL.createObjectURL(file)
            setProfile({ ...profile, avatarUrl: imageUrl })
            showNotification("Profilkép frissítve", "A profilképed sikeresen frissítve lett.")
        }
    }

    const handleEmailChange = () => {
        setIsLoading(true)
        // Simulate API call
        setTimeout(() => {
            setProfile({ ...profile, email: newEmail })
            setNewEmail("")
            setIsLoading(false)
            showNotification("Email cím frissítve", "Az email címed sikeresen frissítve lett.")
        }, 1000)
    }

    const handlePasswordChange = () => {
        if (newPassword !== confirmPassword) {
            showNotification("Hiba", "Az új jelszavak nem egyeznek!", "error")
            return
        }

        if (passwordStrength < 3) {
            showNotification(
                "Gyenge jelszó",
                "Kérjük, válassz erősebb jelszót (legalább 8 karakter, nagybetű, szám és speciális karakter).",
                "error",
            )
            return
        }

        setIsLoading(true)
        // Simulate API call
        setTimeout(() => {
            setCurrentPassword("")
            setNewPassword("")
            setConfirmPassword("")
            setIsLoading(false)
            showNotification("Jelszó módosítva", "A jelszavad sikeresen módosítva lett.")
        }, 1000)
    }

    const handleDeleteProfile = () => {
        // In a real implementation, you would call an API to delete the profile
        showNotification("Profil törölve", "A profilod sikeresen törölve lett.")
        // Redirect to home page or login page
    }

    const handleFullNameChange = (e) => {
        setProfile({ ...profile, fullName: e.target.value })
    }

    const handleFullNameBlur = () => {
        showNotification("Név frissítve", "A neved sikeresen frissítve lett.")
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-900 text-white">
            {/* Custom notification */}
            {notification && (
                <div
                    className={`fixed top-4 right-4 z-50 max-w-md p-4 rounded-lg shadow-lg transition-all duration-300 transform translate-y-0 ${
                        notification.type === "error"
                            ? "bg-red-900 border border-red-700"
                            : "bg-indigo-900 border border-purple-700"
                    }`}
                >
                    <div className="flex items-start gap-3">
                        {notification.type === "error" ? (
                            <X className="h-5 w-5 text-red-400 mt-0.5" />
                        ) : (
                            <Check className="h-5 w-5 text-green-400 mt-0.5" />
                        )}
                        <div>
                            <h4 className="font-medium text-white">{notification.title}</h4>
                            <p className="text-sm mt-1 text-white/80">{notification.message}</p>
                        </div>
                        <button onClick={() => setNotification(null)} className="ml-auto -mt-1 text-white/60 hover:text-white">
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            )}

            <div className="absolute inset-0 bg-[url('/placeholder.svg?height=500&width=500')] opacity-5 bg-repeat"></div>

            <header className="container mx-auto py-8 relative z-10">
                <div className="flex justify-center mb-6">
                    <div className="relative">
                        <img
                            src="/placeholder.svg?height=80&width=80"
                            alt="EduVenture Logo"
                            width={80}
                            height={80}
                            className="rounded-full border-2 border-purple-400/30 shadow-lg shadow-purple-500/20"
                        />
                        <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-indigo-950"></div>
                    </div>
                </div>
                <h1 className="text-4xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-indigo-300">
                    Profilom
                </h1>
                <p className="text-center text-purple-200/80 mb-8 max-w-md mx-auto">
                    Itt kezelheted a személyes adataidat és beállításaidat
                </p>
            </header>

            <main className="container mx-auto px-4 pb-16 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <div className="grid md:grid-cols-[300px_1fr] gap-6">
                        {/* Profile Summary Card */}
                        <div className="space-y-6">
                            <Card className="bg-white/5 backdrop-blur-sm border-purple-500/20 text-white overflow-hidden">
                                <div className="relative h-24 bg-gradient-to-r from-purple-600 to-indigo-600">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="absolute top-2 right-2 bg-black/20 hover:bg-black/40 text-white rounded-full h-8 w-8"
                                    >
                                        <Edit2 className="h-4 w-4" />
                                    </Button>
                                </div>
                                <CardContent className="pt-0 p-6">
                                    <div className="flex flex-col items-center -mt-12 mb-4">
                                        <div
                                            className="relative group"
                                            onMouseEnter={() => setAvatarHover(true)}
                                            onMouseLeave={() => setAvatarHover(false)}
                                        >
                                            <Avatar className="h-24 w-24 border-4 border-indigo-950 shadow-xl transition-all duration-300">
                                                <AvatarImage src={profile.avatarUrl} alt={profile.fullName} className="object-cover" />
                                                <AvatarFallback className="bg-gradient-to-br from-purple-600 to-indigo-600 text-xl">
                                                    {profile.fullName
                                                        .split(" ")
                                                        .map((n) => n[0])
                                                        .join("")}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div
                                                className={`absolute inset-0 bg-black/60 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${
                                                    avatarHover ? "opacity-100" : "opacity-0"
                                                }`}
                                                onClick={() => fileInputRef.current?.click()}
                                            >
                                                <Camera className="h-6 w-6" />
                                            </div>
                                            <Input
                                                ref={fileInputRef}
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={handleAvatarUpload}
                                            />
                                        </div>

                                        <h2 className="text-xl font-semibold mt-3">{profile.fullName}</h2>
                                        <p className="text-purple-300/80">@{profile.username}</p>
                                        <Badge className="mt-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 border-0">
                                            {profile.status}
                                        </Badge>
                                    </div>

                                    <Separator className="bg-purple-500/20 my-4" />

                                    <div className="space-y-3">
                                        <div className="flex items-center text-sm">
                                            <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center mr-3">
                                                <Mail className="h-4 w-4 text-purple-300" />
                                            </div>
                                            <div className="overflow-hidden">
                                                <p className="text-purple-200/70 text-xs">Email</p>
                                                <p className="truncate">{profile.email}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center text-sm">
                                            <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center mr-3">
                                                <User className="h-4 w-4 text-purple-300" />
                                            </div>
                                            <div>
                                                <p className="text-purple-200/70 text-xs">Csatlakozott</p>
                                                <p>{profile.joinDate}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center text-sm">
                                            <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center mr-3">
                                                <Shield className="h-4 w-4 text-purple-300" />
                                            </div>
                                            <div>
                                                <p className="text-purple-200/70 text-xs">Utoljára aktív</p>
                                                <p>{profile.lastActive}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <Separator className="bg-purple-500/20 my-4" />

                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                className="w-full text-red-400 hover:text-red-300 hover:bg-red-950/30 gap-2"
                                            >
                                                <LogOut className="h-4 w-4" />
                                                Kijelentkezés
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent className="bg-indigo-950 border-purple-500/50 text-white">
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Biztosan ki szeretnél jelentkezni?</AlertDialogTitle>
                                                <AlertDialogDescription className="text-purple-200">
                                                    A kijelentkezés után újra be kell jelentkezned a fiókodba.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel className="border-purple-500/50 hover:bg-purple-700/30">
                                                    Mégsem
                                                </AlertDialogCancel>
                                                <AlertDialogAction className="bg-purple-600 hover:bg-purple-700">
                                                    Kijelentkezés
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Main Content */}
                        <div>
                            <Tabs defaultValue="personal" className="w-full">
                                <TabsList className="bg-white/5 border-b border-purple-500/20 w-full rounded-t-lg rounded-b-none h-auto p-0 mb-6">
                                    <TabsTrigger
                                        value="personal"
                                        className="rounded-none data-[state=active]:bg-purple-500/10 data-[state=active]:border-b-2 data-[state=active]:border-purple-400 data-[state=active]:shadow-none py-3 px-4 flex-1"
                                    >
                                        Személyes adatok
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="security"
                                        className="rounded-none data-[state=active]:bg-purple-500/10 data-[state=active]:border-b-2 data-[state=active]:border-purple-400 data-[state=active]:shadow-none py-3 px-4 flex-1"
                                    >
                                        Biztonság
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent value="personal" className="mt-0">
                                    <Card className="bg-white/5 backdrop-blur-sm border-purple-500/20 text-white">
                                        <CardContent className="p-6 space-y-6">
                                            <div className="space-y-4">
                                                <h3 className="text-lg font-medium flex items-center gap-2">
                                                    <User className="h-5 w-5 text-purple-300" />
                                                    Személyes adatok
                                                </h3>

                                                <div className="grid gap-4">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="username" className="text-purple-200">
                                                            Felhasználónév
                                                        </Label>
                                                        <div className="relative">
                                                            <Input
                                                                id="username"
                                                                value={profile.username}
                                                                readOnly
                                                                className="bg-white/5 border-purple-500/30 focus-visible:ring-purple-500 pr-10"
                                                            />
                                                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                                <Lock className="h-4 w-4 text-purple-400/50" />
                                                            </div>
                                                        </div>
                                                        <p className="text-xs text-purple-300/70">A felhasználóneved nem módosítható.</p>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Label htmlFor="fullName" className="text-purple-200">
                                                            Teljes Név
                                                        </Label>
                                                        <Input
                                                            id="fullName"
                                                            value={profile.fullName}
                                                            className="bg-white/5 border-purple-500/30 focus-visible:ring-purple-500 transition-all duration-200 hover:border-purple-400/50"
                                                            onChange={handleFullNameChange}
                                                            onBlur={handleFullNameBlur}
                                                        />
                                                    </div>

                                                    <div className="space-y-2">
                                                        <div className="flex justify-between items-center">
                                                            <Label htmlFor="email" className="text-purple-200">
                                                                Email cím
                                                            </Label>
                                                            <Dialog>
                                                                <DialogTrigger asChild>
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="sm"
                                                                        className="h-8 text-purple-300 hover:text-white hover:bg-purple-700/50"
                                                                    >
                                                                        <Edit2 className="h-3.5 w-3.5 mr-1" />
                                                                        Módosítás
                                                                    </Button>
                                                                </DialogTrigger>
                                                                <DialogContent className="bg-indigo-950 border-purple-500/50 text-white">
                                                                    <DialogHeader>
                                                                        <DialogTitle>Email cím módosítása</DialogTitle>
                                                                    </DialogHeader>
                                                                    <div className="space-y-4 py-4">
                                                                        <div className="space-y-2">
                                                                            <Label htmlFor="current-email">Jelenlegi email</Label>
                                                                            <Input
                                                                                id="current-email"
                                                                                value={profile.email}
                                                                                readOnly
                                                                                className="bg-white/5 border-purple-500/30"
                                                                            />
                                                                        </div>
                                                                        <div className="space-y-2">
                                                                            <Label htmlFor="new-email">Új email</Label>
                                                                            <Input
                                                                                id="new-email"
                                                                                type="email"
                                                                                value={newEmail}
                                                                                onChange={(e) => setNewEmail(e.target.value)}
                                                                                className="bg-white/5 border-purple-500/30 focus-visible:ring-purple-500"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <DialogFooter>
                                                                        <DialogClose asChild>
                                                                            <Button variant="outline" className="border-purple-500/50 hover:bg-purple-700/30">
                                                                                Mégsem
                                                                            </Button>
                                                                        </DialogClose>
                                                                        <Button
                                                                            onClick={handleEmailChange}
                                                                            disabled={!newEmail || isLoading}
                                                                            className="bg-purple-600 hover:bg-purple-700"
                                                                        >
                                                                            {isLoading ? (
                                                                                <>
                                                                                    <svg
                                                                                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                                        fill="none"
                                                                                        viewBox="0 0 24 24"
                                                                                    >
                                                                                        <circle
                                                                                            className="opacity-25"
                                                                                            cx="12"
                                                                                            cy="12"
                                                                                            r="10"
                                                                                            stroke="currentColor"
                                                                                            strokeWidth="4"
                                                                                        ></circle>
                                                                                        <path
                                                                                            className="opacity-75"
                                                                                            fill="currentColor"
                                                                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                                                        ></path>
                                                                                    </svg>
                                                                                    Feldolgozás...
                                                                                </>
                                                                            ) : (
                                                                                "Mentés"
                                                                            )}
                                                                        </Button>
                                                                    </DialogFooter>
                                                                </DialogContent>
                                                            </Dialog>
                                                        </div>
                                                        <div className="relative">
                                                            <Input
                                                                id="email"
                                                                value={profile.email}
                                                                readOnly
                                                                className="bg-white/5 border-purple-500/30 pr-10"
                                                            />
                                                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                                <Check className="h-4 w-4 text-green-400" />
                                                            </div>
                                                        </div>
                                                        <p className="text-xs text-green-400/80">Megerősített email cím</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                <TabsContent value="security" className="mt-0">
                                    <Card className="bg-white/5 backdrop-blur-sm border-purple-500/20 text-white">
                                        <CardContent className="p-6 space-y-6">
                                            {/* Password Change Section */}
                                            <div className="space-y-4">
                                                <h3 className="text-lg font-medium flex items-center gap-2">
                                                    <Lock className="h-5 w-5 text-purple-300" />
                                                    Jelszó módosítása
                                                </h3>
                                                <div className="space-y-4">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="current-password" className="text-purple-200">
                                                            Jelenlegi jelszó
                                                        </Label>
                                                        <Input
                                                            id="current-password"
                                                            type="password"
                                                            value={currentPassword}
                                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                                            className="bg-white/5 border-purple-500/30 focus-visible:ring-purple-500 transition-all duration-200 hover:border-purple-400/50"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="new-password" className="text-purple-200">
                                                            Új jelszó
                                                        </Label>
                                                        <Input
                                                            id="new-password"
                                                            type="password"
                                                            value={newPassword}
                                                            onChange={(e) => setNewPassword(e.target.value)}
                                                            className="bg-white/5 border-purple-500/30 focus-visible:ring-purple-500 transition-all duration-200 hover:border-purple-400/50"
                                                        />
                                                        {newPassword && (
                                                            <div className="mt-2">
                                                                <div className="text-xs text-purple-200 mb-1">Jelszó erőssége:</div>
                                                                <div className="flex gap-1 h-1.5">
                                                                    <div
                                                                        className={`flex-1 rounded-full ${passwordStrength >= 1 ? "bg-red-500" : "bg-gray-700"}`}
                                                                    ></div>
                                                                    <div
                                                                        className={`flex-1 rounded-full ${passwordStrength >= 2 ? "bg-yellow-500" : "bg-gray-700"}`}
                                                                    ></div>
                                                                    <div
                                                                        className={`flex-1 rounded-full ${passwordStrength >= 3 ? "bg-green-500" : "bg-gray-700"}`}
                                                                    ></div>
                                                                    <div
                                                                        className={`flex-1 rounded-full ${passwordStrength >= 4 ? "bg-green-500" : "bg-gray-700"}`}
                                                                    ></div>
                                                                </div>
                                                                <div className="text-xs mt-1 text-purple-300/70">
                                                                    {passwordStrength === 0 && "Nagyon gyenge"}
                                                                    {passwordStrength === 1 && "Gyenge"}
                                                                    {passwordStrength === 2 && "Közepes"}
                                                                    {passwordStrength === 3 && "Erős"}
                                                                    {passwordStrength === 4 && "Nagyon erős"}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="confirm-password" className="text-purple-200">
                                                            Új jelszó megerősítése
                                                        </Label>
                                                        <div className="relative">
                                                            <Input
                                                                id="confirm-password"
                                                                type="password"
                                                                value={confirmPassword}
                                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                                className={`bg-white/5 border-purple-500/30 focus-visible:ring-purple-500 transition-all duration-200 hover:border-purple-400/50 ${
                                                                    confirmPassword && newPassword && confirmPassword !== newPassword
                                                                        ? "border-red-500 focus-visible:ring-red-500"
                                                                        : ""
                                                                }`}
                                                            />
                                                            {confirmPassword && newPassword && (
                                                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                                    {confirmPassword === newPassword ? (
                                                                        <Check className="h-4 w-4 text-green-400" />
                                                                    ) : (
                                                                        <X className="h-4 w-4 text-red-400" />
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>
                                                        {confirmPassword && newPassword && confirmPassword !== newPassword && (
                                                            <p className="text-xs text-red-400">A jelszavak nem egyeznek</p>
                                                        )}
                                                    </div>
                                                    <Button
                                                        onClick={handlePasswordChange}
                                                        disabled={!currentPassword || !newPassword || !confirmPassword || isLoading}
                                                        className="bg-purple-600 hover:bg-purple-700 transition-all duration-200"
                                                    >
                                                        {isLoading ? (
                                                            <>
                                                                <svg
                                                                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <circle
                                                                        className="opacity-25"
                                                                        cx="12"
                                                                        cy="12"
                                                                        r="10"
                                                                        stroke="currentColor"
                                                                        strokeWidth="4"
                                                                    ></circle>
                                                                    <path
                                                                        className="opacity-75"
                                                                        fill="currentColor"
                                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                                    ></path>
                                                                </svg>
                                                                Feldolgozás...
                                                            </>
                                                        ) : (
                                                            "Jelszó módosítása"
                                                        )}
                                                    </Button>
                                                </div>
                                            </div>

                                            <Separator className="bg-purple-500/20" />

                                            {/* Delete Profile Section */}
                                            <div className="pt-4">
                                                <div className="bg-red-950/20 border border-red-500/30 rounded-lg p-4 mb-4">
                                                    <div className="flex items-start gap-3">
                                                        <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                                                        <div>
                                                            <h4 className="text-red-400 font-medium">Veszélyes zóna</h4>
                                                            <p className="text-sm text-red-300/80 mt-1">
                                                                A profil törlése után minden adatod véglegesen elvész. Ez a művelet nem visszavonható.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button
                                                            variant="outline"
                                                            className="w-full border-red-500/50 text-red-400 hover:bg-red-950/30 hover:text-red-300 transition-all duration-200"
                                                        >
                                                            Profilom törlése
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent className="bg-indigo-950 border-purple-500/50 text-white">
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Biztosan törölni szeretnéd a profilodat?</AlertDialogTitle>
                                                            <AlertDialogDescription className="text-purple-200">
                                                                Ez a művelet nem visszavonható. A profilod és minden hozzá tartozó adat véglegesen
                                                                törlődik.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel className="border-purple-500/50 hover:bg-purple-700/30">
                                                                Mégsem
                                                            </AlertDialogCancel>
                                                            <AlertDialogAction onClick={handleDeleteProfile} className="bg-red-600 hover:bg-red-700">
                                                                Törlés
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

