"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Michael R.",
    role: "BMW M3 Owner",
    avatar: "MR",
    rating: 5,
    title: "Night and day difference",
    content:
      "Switched from a premium competitor to APEX Pro Racing and the difference is incredible. Engine runs smoother, quieter, and I swear I can feel the extra power. Worth every penny.",
    verified: true,
  },
  {
    id: 2,
    name: "Sarah K.",
    role: "Track Day Enthusiast",
    avatar: "SK",
    rating: 5,
    title: "Handles track abuse perfectly",
    content:
      "Put my Porsche through 20 track days on one fill of APEX Extreme. Oil analysis came back perfect. This stuff is bulletproof under pressure.",
    verified: true,
  },
  {
    id: 3,
    name: "James T.",
    role: "Mercedes AMG Owner",
    avatar: "JT",
    rating: 5,
    title: "Finally found my go-to oil",
    content:
      "After trying every premium oil on the market, APEX is the only one that keeps my AMG running like new. The cold start improvement alone is worth it.",
    verified: true,
  },
  {
    id: 4,
    name: "David L.",
    role: "Classic Car Collector",
    avatar: "DL",
    rating: 5,
    title: "Perfect for vintage engines",
    content:
      "I use APEX in my collection of classic Ferraris. It protects these irreplaceable engines better than anything else I&apos;ve tried. The formulation is perfect.",
    verified: true,
  },
  {
    id: 5,
    name: "Emma W.",
    role: "Daily Driver",
    avatar: "EW",
    rating: 5,
    title: "Noticeable fuel savings",
    content:
      "Started using APEX Elite GT six months ago. My fuel economy improved by about 8% and the engine sounds healthier. Great product for everyday driving.",
    verified: true,
  },
  {
    id: 6,
    name: "Chris M.",
    role: "Professional Mechanic",
    avatar: "CM",
    rating: 5,
    title: "What I recommend to clients",
    content:
      "As a mechanic for 25 years, I&apos;ve seen what cheap oil does to engines. I only recommend APEX to my clients. The difference in engine wear is measurable.",
    verified: true,
  },
];

export function ReviewsSection() {
  return (
    <section id="reviews" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">
            Testimonials
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-bold text-foreground tracking-tight">
            What Drivers Say
          </h2>
          <div className="mt-6 flex items-center justify-center gap-4">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="h-6 w-6 text-primary fill-primary" />
              ))}
            </div>
            <span className="text-lg text-muted-foreground">
              4.9/5 from 12,000+ reviews
            </span>
          </div>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative h-full p-6 bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-300">
                {/* Quote icon */}
                <Quote className="absolute top-6 right-6 h-8 w-8 text-primary/10" />

                {/* Header */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">
                      {review.avatar}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-foreground">
                        {review.name}
                      </h4>
                      {review.verified && (
                        <span className="px-2 py-0.5 text-[10px] font-medium bg-primary/10 text-primary rounded">
                          Verified
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {review.role}
                    </p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating
                          ? "text-primary fill-primary"
                          : "text-muted"
                      }`}
                    />
                  ))}
                </div>

                {/* Content */}
                <h5 className="font-semibold text-foreground mb-2">
                  {review.title}
                </h5>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {review.content}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
