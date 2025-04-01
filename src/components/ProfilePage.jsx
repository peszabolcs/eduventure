"use client";

import { useState, useRef, useEffect } from "react";
import { useAuth } from "../components/AuthContext";
import {
  User,
  Edit2,
  Mail,
  Lock,
  Shield,
  LogOut,
  Camera,
  Check,
  X,
  AlertTriangle,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent } from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "../components/ui/dialog";
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
} from "../components/ui/alert-dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const [newEmail, setNewEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [avatarHover, setAvatarHover] = useState(false);
  const [notification, setNotification] = useState(null);
  const [careerResults, setCareerResults] = useState([]);
  const { user, logout, setUser } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    username: "",
    fullName: "",
    email: "",
    created_at: "",
    avatarUrl: "",
    coverUrl: "",
  });
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
  const [newFullName, setNewFullName] = useState("");
  const [isFullNameDialogOpen, setIsFullNameDialogOpen] = useState(false);
  const fileInputCoverRef = useRef(null);
  const fileInputAvatarRef = useRef(null);

  useEffect(() => {
    // Simple password strength calculator
    if (!newPassword) {
      setPasswordStrength(0);
      return;
    }

    let strength = 0;
    if (newPassword.length >= 8) strength += 1;
    if (/[A-Z]/.test(newPassword)) strength += 1;
    if (/[0-9]/.test(newPassword)) strength += 1;
    if (/[^A-Za-z0-9]/.test(newPassword)) strength += 1;

    setPasswordStrength(strength);
  }, [newPassword]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${API_URL}/backend/get_user_data.php`, {
          credentials: "include",
        });
        const userData = await response.json();
        if (userData.success) {
          setProfile({
            username: userData.user.username,
            fullName: userData.user.fullname,
            email: userData.user.email,
            avatarUrl: userData.user.avatar
              ? `${API_URL}${userData.user.avatar}`
              : null,
            coverUrl: userData.user.cover
              ? `${API_URL}${userData.user.cover}`
              : null,
            joinDate: userData.user.created_at,
            role: userData.user.role,
          });
        }
      } catch (error) {
        // Handle error silently
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchCareerResults = async () => {
      try {
        const response = await fetch(
          `${API_URL}/backend/get_career_results.php`,
          {
            credentials: "include",
          }
        );
        const data = await response.json();
        if (data.success) {
          setCareerResults(data.results);
        }
      } catch (error) {
        console.error("Failed to fetch career results:", error);
      }
    };

    fetchCareerResults();
  }, []);

  useEffect(() => {
    // Save the original background
    const originalBackground = document.body.style.background;

    // Set the background for the profile page
    document.body.style.background =
      "linear-gradient(to bottom right, #312e81, #581c87, #831843)";
    document.body.style.backgroundAttachment = "fixed";

    // Cleanup function to restore the original background when component unmounts
    return () => {
      document.body.style.background = originalBackground;
      document.body.style.backgroundAttachment = "";
    };
  }, []);

  // Custom notification function to replace toast
  const showNotification = (title, message, type = "success") => {
    setNotification({ title, message, type });

    // Auto-hide notification after 3 seconds
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const handleCoverUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("cover", file);

    try {
      const response = await fetch(`${API_URL}/backend/update_background.php`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      const result = await response.json();
      if (result.success) {
        const newCoverUrl = `${API_URL}${result.cover_url}`;
        setProfile({ ...profile, coverUrl: newCoverUrl });
        showNotification(
          "Háttérkép frissítve",
          "A háttérképed sikeresen frissítve lett."
        );
      } else {
        showNotification(
          "Hiba",
          result.error || "A háttérkép frissítése közben hiba történt.",
          "error"
        );
      }
    } catch (error) {
      showNotification(
        "Hiba",
        "A háttérkép frissítése közben hiba történt.",
        "error"
      );
    }
  };

  const handleAvatarUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const response = await fetch(`${API_URL}/backend/update_avatar.php`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      const result = await response.json();
      if (result.success) {
        const newAvatarUrl = `${API_URL}${result.avatar_url}`;
        setProfile({ ...profile, avatarUrl: newAvatarUrl });
        showNotification(
          "Profilkép frissítve",
          "A profilképed sikeresen frissítve lett."
        );
      } else {
        showNotification(
          "Hiba",
          result.error || "A profilkép frissítése közben hiba történt.",
          "error"
        );
      }
    } catch (error) {
      showNotification(
        "Hiba",
        "A profilkép frissítése közben hiba történt.",
        "error"
      );
    }
  };

  const handleEmailChange = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/backend/update_profile.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: newEmail }),
        credentials: "include",
      });
      const result = await response.json();
      if (result.success) {
        setProfile({ ...profile, email: newEmail });
        setNewEmail("");
        setIsLoading(false);
        showNotification(
          "Email cím frissítve",
          "Az email címed sikeresen frissítve lett."
        );
        setIsEmailDialogOpen(false);
      } else {
        showNotification(
          "Hiba",
          "Az email cím frissítése közben hiba történt.",
          "error"
        );
      }
    } catch (error) {
      console.error("Email update failed:", error);
      showNotification(
        "Hiba",
        "Az email cím frissítése közben hiba történt.",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      showNotification("Hiba", "Az új jelszavak nem egyeznek!", "error");
      return;
    }

    if (passwordStrength < 3) {
      showNotification(
        "Gyenge jelszó",
        "Kérjük, válassz erősebb jelszót (legalább 8 karakter, nagybetű, szám és speciális karakter).",
        "error"
      );
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/backend/update_profile.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: newPassword,
          currentPassword: currentPassword,
        }),
        credentials: "include",
      });
      const result = await response.json();
      if (result.success) {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setIsLoading(false);
        showNotification(
          "Jelszó módosítva",
          "A jelszavad sikeresen módosítva lett."
        );
      } else {
        const errorMessage =
          result.error || "A jelszó módosítása közben hiba történt.";
        showNotification("Hiba", errorMessage, "error");
      }
    } catch (error) {
      console.error("Password update failed:", error);
      showNotification(
        "Hiba",
        "A jelszó módosítása közben hiba történt.",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProfile = async () => {
    try {
      const response = await fetch(`${API_URL}/backend/delete_profile.php`, {
        method: "POST",
        credentials: "include",
      });
      const result = await response.json();
      if (result.success) {
        showNotification(
          "Profil törölve",
          "A profilod sikeresen törölve lett."
        );
        navigate("/");
        logout();
      } else {
        showNotification(
          "Hiba",
          "A profil törlése közben hiba történt.",
          "error"
        );
      }
    } catch (error) {
      console.error("Profile deletion failed:", error);
      showNotification(
        "Hiba",
        "A profil törlése közben hiba történt.",
        "error"
      );
    }
    // Redirect to home page or login page
  };

  const handleFullNameChange = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/backend/update_profile.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullname: newFullName }),
        credentials: "include",
      });
      const result = await response.json();
      if (result.success) {
        setProfile({ ...profile, fullName: newFullName });
        setNewFullName("");
        showNotification("Név frissítve", "A neved sikeresen frissítve lett.");
        setIsFullNameDialogOpen(false);
      } else {
        showNotification(
          "Hiba",
          "A név frissítése közben hiba történt.",
          "error"
        );
      }
    } catch (error) {
      console.error("Full name update failed:", error);
      showNotification(
        "Hiba",
        "A név frissítése közben hiba történt.",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!profile) {
    return <div>Betöltés...</div>;
  }

  return (
    <>
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
              <p className="text-sm mt-1 text-white/80">
                {notification.message}
              </p>
            </div>
            <button
              onClick={() => setNotification(null)}
              className="ml-auto -mt-1 text-white/60 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      <style jsx global>{`
        body {
          background: linear-gradient(
            to bottom right,
            #312e81,
            #581c87,
            #831843
          );
          background-attachment: fixed;
        }
      `}</style>

      <main className="container mx-auto px-4 pb-16 pt-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-[300px_1fr] gap-6">
              {/* Profile Summary Card */}
              <div className="space-y-6">
                <Card className="bg-white/5 backdrop-blur-sm border-purple-500/20 text-white overflow-hidden">
                  {profile.coverUrl && profile.coverUrl !== "NULL" ? (
                    <img
                      src={profile.coverUrl}
                      alt="Borítókép"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="relative h-24 bg-gradient-to-r from-purple-600 to-indigo-600"></div>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-black/20 hover:bg-black/40 text-white rounded-full h-8 w-8"
                    onClick={() => fileInputCoverRef.current?.click()}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Input
                    ref={fileInputCoverRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleCoverUpload}
                  />

                  <CardContent className="pt-0 p-6">
                    <div className="flex flex-col items-center -mt-12 mb-4">
                      <div
                        className="relative group"
                        onMouseEnter={() => setAvatarHover(true)}
                        onMouseLeave={() => setAvatarHover(false)}
                      >
                        <Avatar className="h-24 w-24 border-4 border-indigo-950 shadow-xl transition-all duration-300">
                          <AvatarImage
                            src={
                              profile.avatarUrl !== "NULL"
                                ? profile.avatarUrl
                                : undefined
                            }
                            alt={profile.fullName}
                            className="object-cover"
                          />
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
                          onClick={() => fileInputAvatarRef.current?.click()}
                        >
                          <Camera className="h-6 w-6" />
                        </div>
                        <Input
                          ref={fileInputAvatarRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleAvatarUpload}
                        />
                      </div>

                      <h2 className="text-xl font-semibold mt-3">
                        {profile.fullName}
                      </h2>
                      <p className="text-purple-300/80">@{profile.username}</p>
                      <Badge className="mt-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 border-0">
                        {profile.role}
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
                          <p className="text-purple-200/70 text-xs">
                            Csatlakozott
                          </p>
                          <p>{profile.joinDate}</p>
                        </div>
                      </div>
                      {/*TODO last active*/}
                      {/*<div className="flex items-center text-sm">*/}
                      {/*    <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center mr-3">*/}
                      {/*        <Shield className="h-4 w-4 text-purple-300" />*/}
                      {/*    </div>*/}
                      {/*    <div>*/}
                      {/*        /!*<p className="text-purple-200/70 text-xs">Utoljára aktív</p>*!/*/}
                      {/*        /!*<p>{profile.lastActive}</p>*!/*/}
                      {/*    </div>*/}
                      {/*</div>*/}
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
                      <AlertDialogContent
                        className="bg-indigo-950 border-purple-500/50 text-white"
                        aria-describedby="logout-dialog"
                      >
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Biztosan ki szeretnél jelentkezni?
                          </AlertDialogTitle>
                          <AlertDialogDescription className="text-purple-200">
                            A kijelentkezés után újra be kell jelentkezned a
                            fiókodba.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="border-purple-500/50 hover:bg-purple-700/30 text-black mt-0">
                            Mégsem
                          </AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-purple-600 hover:bg-purple-700"
                            onClick={logout}
                          >
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
                <Tabs defaultValue="profile" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="profile">Profil</TabsTrigger>
                    <TabsTrigger value="security">Biztonság</TabsTrigger>
                    <TabsTrigger value="career">Karrier</TabsTrigger>
                  </TabsList>

                  <TabsContent value="profile" className="mt-6">
                    <Card className="bg-white/5 backdrop-blur-sm border-purple-500/20 text-white">
                      <CardContent className="p-6 space-y-6">
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium flex items-center gap-2">
                            <User className="h-5 w-5 text-purple-300" />
                            Személyes adatok
                          </h3>

                          <div className="grid gap-4">
                            <div className="space-y-2">
                              <Label
                                htmlFor="username"
                                className="text-purple-200"
                              >
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
                              <p className="text-xs text-purple-300/70">
                                A felhasználóneved nem módosítható.
                              </p>
                            </div>

                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <Label
                                  htmlFor="fullName"
                                  className="text-purple-200"
                                >
                                  Teljes Név
                                </Label>
                                <Dialog
                                  open={isFullNameDialogOpen}
                                  onOpenChange={setIsFullNameDialogOpen}
                                >
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
                                  <DialogContent
                                    className="bg-indigo-950 border-purple-500/50 text-white"
                                    aria-describedby="full-name-dialog"
                                  >
                                    <DialogHeader>
                                      <DialogTitle>
                                        Teljes név módosítása
                                      </DialogTitle>
                                    </DialogHeader>
                                    <div className="space-y-4 py-4">
                                      <div className="space-y-2">
                                        <Label htmlFor="current-fullname">
                                          Jelenlegi teljes név
                                        </Label>
                                        <Input
                                          id="current-fullname"
                                          value={profile.fullName}
                                          readOnly
                                          className="bg-white/5 border-purple-500/30"
                                        />
                                      </div>
                                      <div className="space-y-2">
                                        <Label htmlFor="new-fullname">
                                          Új teljes név
                                        </Label>
                                        <Input
                                          id="new-fullname"
                                          type="text"
                                          value={newFullName}
                                          onChange={(e) =>
                                            setNewFullName(e.target.value)
                                          }
                                          className="bg-white/5 border-purple-500/30 focus-visible:ring-purple-500"
                                        />
                                      </div>
                                    </div>
                                    <DialogFooter>
                                      <DialogClose asChild>
                                        <Button
                                          variant="outline"
                                          className="border-purple-500/50 hover:bg-purple-700/30 text-black"
                                        >
                                          Mégsem
                                        </Button>
                                      </DialogClose>
                                      <Button
                                        onClick={handleFullNameChange}
                                        disabled={!newFullName || isLoading}
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
                                  id="fullName"
                                  value={profile.fullName}
                                  readOnly
                                  className="bg-white/5 border-purple-500/30 pr-10"
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <Label
                                  htmlFor="email"
                                  className="text-purple-200"
                                >
                                  Email cím
                                </Label>
                                <Dialog
                                  open={isEmailDialogOpen}
                                  onOpenChange={setIsEmailDialogOpen}
                                >
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
                                  <DialogContent
                                    className="bg-indigo-950 border-purple-500/50 text-white"
                                    aria-describedby="email-dialog"
                                  >
                                    <DialogHeader>
                                      <DialogTitle>
                                        Email cím módosítása
                                      </DialogTitle>
                                    </DialogHeader>
                                    <div className="space-y-4 py-4">
                                      <div className="space-y-2">
                                        <Label htmlFor="current-email">
                                          Jelenlegi email
                                        </Label>
                                        <Input
                                          id="current-email"
                                          value={profile.email}
                                          readOnly
                                          className="bg-white/5 border-purple-500/30"
                                        />
                                      </div>
                                      <div className="space-y-2">
                                        <Label htmlFor="new-email">
                                          Új email
                                        </Label>
                                        <Input
                                          id="new-email"
                                          type="email"
                                          value={newEmail}
                                          onChange={(e) =>
                                            setNewEmail(e.target.value)
                                          }
                                          className="bg-white/5 border-purple-500/30 focus-visible:ring-purple-500"
                                        />
                                      </div>
                                    </div>
                                    <DialogFooter>
                                      <DialogClose asChild>
                                        <Button
                                          variant="outline"
                                          className="border-purple-500/50 hover:bg-purple-700/30 text-black"
                                        >
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
                              <p className="text-xs text-green-400/80">
                                Megerősített email cím
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="security" className="mt-6">
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
                              <Label
                                htmlFor="current-password"
                                className="text-purple-200"
                              >
                                Jelenlegi jelszó
                              </Label>
                              <Input
                                id="current-password"
                                type="password"
                                value={currentPassword}
                                onChange={(e) =>
                                  setCurrentPassword(e.target.value)
                                }
                                className="bg-white/5 border-purple-500/30 focus-visible:ring-purple-500 transition-all duration-200 hover:border-purple-400/50"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label
                                htmlFor="new-password"
                                className="text-purple-200"
                              >
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
                                  <div className="text-xs text-purple-200 mb-1">
                                    Jelszó erőssége:
                                  </div>
                                  <div className="flex gap-1 h-1.5">
                                    <div
                                      className={`flex-1 rounded-full ${
                                        passwordStrength >= 1
                                          ? "bg-red-500"
                                          : "bg-gray-700"
                                      }`}
                                    ></div>
                                    <div
                                      className={`flex-1 rounded-full ${
                                        passwordStrength >= 2
                                          ? "bg-yellow-500"
                                          : "bg-gray-700"
                                      }`}
                                    ></div>
                                    <div
                                      className={`flex-1 rounded-full ${
                                        passwordStrength >= 3
                                          ? "bg-green-500"
                                          : "bg-gray-700"
                                      }`}
                                    ></div>
                                    <div
                                      className={`flex-1 rounded-full ${
                                        passwordStrength >= 4
                                          ? "bg-green-500"
                                          : "bg-gray-700"
                                      }`}
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
                              <Label
                                htmlFor="confirm-password"
                                className="text-purple-200"
                              >
                                Új jelszó megerősítése
                              </Label>
                              <div className="relative">
                                <Input
                                  id="confirm-password"
                                  type="password"
                                  value={confirmPassword}
                                  onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                  }
                                  className={`bg-white/5 border-purple-500/30 focus-visible:ring-purple-500 transition-all duration-200 hover:border-purple-400/50 ${
                                    confirmPassword &&
                                    newPassword &&
                                    confirmPassword !== newPassword
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
                              {confirmPassword &&
                                newPassword &&
                                confirmPassword !== newPassword && (
                                  <p className="text-xs text-red-400">
                                    A jelszavak nem egyeznek
                                  </p>
                                )}
                            </div>
                            <Button
                              onClick={handlePasswordChange}
                              disabled={
                                !currentPassword ||
                                !newPassword ||
                                !confirmPassword ||
                                isLoading
                              }
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
                                <h4 className="text-red-400 font-medium">
                                  Veszélyes zóna
                                </h4>
                                <p className="text-sm text-red-300/80 mt-1">
                                  A profil törlése után minden adatod véglegesen
                                  elvész. Ez a művelet nem visszavonható.
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
                            <AlertDialogContent
                              className="bg-indigo-950 border-purple-500/50 text-white"
                              aria-describedby="delete-profile-dialog"
                            >
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Biztosan törölni szeretnéd a profilodat?
                                </AlertDialogTitle>
                                <AlertDialogDescription className="text-purple-200">
                                  Ez a művelet nem visszavonható. A profilod és
                                  minden hozzá tartozó adat véglegesen törlődik.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel className="border-purple-500/50 hover:bg-purple-700/30 text-black m-0">
                                  Mégsem
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={handleDeleteProfile}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Törlés
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="career" className="mt-6">
                    {careerResults.length > 0 ? (
                      <div className="space-y-6">
                        {careerResults.map((result) => (
                          <Card
                            key={result.id}
                            className="bg-white/5 border-purple-500/20"
                          >
                            <CardContent className="p-6">
                              <div className="flex justify-between items-start mb-4">
                                <div>
                                  <p className="text-sm text-purple-300">
                                    Teszt dátuma:{" "}
                                    {new Date(result.date).toLocaleDateString(
                                      "hu-HU",
                                      {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                      }
                                    )}
                                  </p>
                                </div>
                              </div>

                              <div className="space-y-4">
                                <div>
                                  <h3 className="text-lg font-semibold text-white mb-2">
                                    Top karrier egyezések
                                  </h3>
                                  <div className="space-y-3">
                                    {result.results?.career_matches
                                      ?.slice(0, 3)
                                      .map((career, index) => (
                                        <div
                                          key={index}
                                          className="bg-white/5 rounded-lg p-3 border border-purple-500/20"
                                        >
                                          <div className="flex justify-between items-start">
                                            <div>
                                              <h4 className="text-white font-medium">
                                                {career.title}
                                              </h4>
                                              <p className="text-purple-300/80 text-sm mt-1">
                                                {career.description}
                                              </p>
                                            </div>
                                            <div className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded text-sm">
                                              {career.score}%
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                  </div>
                                </div>

                                <div>
                                  <h3 className="text-lg font-semibold text-white mb-2">
                                    Személyiség tulajdonságok
                                  </h3>
                                  <div className="flex flex-wrap gap-2">
                                    {result.results?.personality_profile?.traits
                                      ?.slice(0, 3)
                                      .map((trait, index) => (
                                        <div
                                          key={index}
                                          className="bg-purple-500/10 text-purple-300 px-3 py-1 rounded-full text-sm"
                                        >
                                          {trait.name}
                                        </div>
                                      ))}
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <Card className="bg-white/5 backdrop-blur-sm border-purple-500/20">
                        <CardContent className="p-6 text-center">
                          <p className="text-purple-200/80 mb-4">
                            Még nem végeztél pályaorientációs tesztet.
                          </p>
                          <Button
                            variant="outline"
                            className="text-purple-300 border-purple-500/20 hover:bg-purple-500/10"
                            onClick={() => navigate("/career-test")}
                          >
                            Teszt elvégzése
                          </Button>
                        </CardContent>
                      </Card>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </>
  );
}
