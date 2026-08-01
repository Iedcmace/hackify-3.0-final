"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// 1. Register the plugin so GSAP knows how to track scrolling
gsap.registerPlugin(ScrollTrigger);

export default function BasicScrollTest() {
    // 2. Create a reference to target this specific HTML section
    const sectionRef = useRef(null);

    useGSAP(() => {
        // 3. The Animation: 'from' means it starts with these values and animates to its default CSS state
        gsap.from(".reveal-box", {
            y: 100, // Starts 100px down
            opacity: 0, // Starts invisible
            duration: 1.2, // Takes 1.2 seconds
            ease: "power3.out", // Smooth deceleration
            scrollTrigger: {
                trigger: sectionRef.current, // Watch this section
                start: "top 75%", // Animate when the top of the section hits 75% down your screen
                toggleActions: "play none none reverse", // Plays when scrolling down, reverses when scrolling back up!
                markers: true // ⚠️ Keep this ON for testing! It shows exactly where the trigger lines are on your screen.
            }
        });
    }, { scope: sectionRef });

    return (
        // We attach the ref to the parent container
        <section ref={sectionRef} className="flex min-h-screen items-center justify-center bg-[#050505] py-20">

            {/* This is the box that will animate (notice the class "reveal-box") */}
            <div className="reveal-box border-2 border-[#a4c875]/40 bg-[#0a0a0a] p-10 shadow-[0_0_30px_rgba(164,200,117,0.1)]">
                <h2 className="font-heading text-3xl font-black uppercase text-[#a4c875]">
                    Target Acquired
                </h2>
                <p className="mt-4 font-mono text-sm text-gray-400">
                    Basic scroll animation successful.
                </p>
            </div>

        </section>
    );
}