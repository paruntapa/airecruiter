"use client"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

export default function Home() {
	const router = useRouter();
	const { isAuthenticated, loading } = useAuth();

	useEffect(() => {
		// Redirect authenticated users to dashboard
		if (!loading && isAuthenticated) {
			router.push("/dashboard");
		}
	}, [loading, isAuthenticated, router]);

	const handleClick = () => {
		if (isAuthenticated) {
			router.push("/dashboard");
		} else {
			router.push("/auth");
		}
	};

	// Show loading while checking auth status
	if (loading) {
		return (
			<div className="flex items-center justify-center h-screen">
				<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
			</div>
		);
	}

	return (
		<div className="flex justify-center w-screen items-center h-screen">
			<div className="flex flex-col items-center gap-5">	  
				<div>
					Created by - Tel Zac 
				</div>
				<Button onClick={handleClick}>
					{isAuthenticated ? "Go to Dashboard" : "Sign In"}
				</Button>
			</div>
		</div>
	);
}
