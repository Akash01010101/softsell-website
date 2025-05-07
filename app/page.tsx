"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { ArrowRight, CheckCircle, DollarSign, Upload, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  company: z.string().min(2, { message: "Company name must be at least 2 characters." }),
  licenseType: z.string().min(1, { message: "Please select a license type." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
})

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      licenseType: "",
      message: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    setIsFormSubmitted(true)
    form.reset()

    // Reset submission status after 3 seconds
    setTimeout(() => {
      setIsFormSubmitted(false)
    }, 3000)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-32 container">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 flex flex-wrap justify-center">
  {["Turn", "Unused", "Software", "Licenses", "Into"].map((word, wordIndex) => (
    <span key={wordIndex} className="inline-block mr-2">
      {Array.from(word).map((char, charIndex) => (
        <motion.span
          key={`${wordIndex}-${charIndex}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: (wordIndex * 6 + charIndex) * 0.03 }}
          className="inline-block"
        >
          {char}
        </motion.span>
      ))}
    </span>
  ))}
  <span className="inline-block text-primary ml-2">
    {Array.from("Cash").map((char, index) => (
      <motion.span
        key={`cash-${index}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: (6 * 5 + index) * 0.03 }}
        className="inline-block"
      >
        {char}
      </motion.span>
    ))}
  </span>
</h1>

<p className="text-xl text-muted-foreground mb-8 md:px-10 overflow-hidden whitespace-normal">
  {[
    "SoftSell",
    "helps",
    "businesses",
    "recover",
    "value",
    "from",
    "unused",
    "or",
    "excess",
    "software",
    "licenses.",
    "Maximize","your",
    "ROI", "by", "selling",
    "unused", "licenses",
    "through", "our", "secure",
    "and", "efficient", "platform."
  ].map((word, wordIndex) => (
    <span key={wordIndex} className="inline-block mr-1">
      {Array.from(word).map((char, charIndex) => (
        <motion.span
          key={`p1-${wordIndex}-${charIndex}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.1, delay: 0.5 + (wordIndex * 8 + charIndex) * 0.01 }}
          className="inline-block"
        >
          {char}
        </motion.span>
      ))}
      &nbsp;
    </span>
  ))}
</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 1.5 }}
              >
                <Button size="lg" className="text-md">
                  Sell My Licenses
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 1.7 }}
              >
                <Button size="lg" variant="outline" className="text-md">
                  Get a Quote
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-20 bg-muted">
          <div className="container">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our streamlined process makes selling your unused software licenses quick and easy.
              </p>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={itemVariants} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Upload License</h3>
                <p className="text-muted-foreground">
                  Submit your license details through our secure portal. We support all major software vendors.
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Get Valuation</h3>
                <p className="text-muted-foreground">
                  Our experts analyze your licenses and provide a fair market valuation within 24 hours.
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <DollarSign className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Get Paid</h3>
                <p className="text-muted-foreground">
                  Accept our offer and receive payment via your preferred method within 3 business days.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section id="why-choose-us" className="py-20">
          <div className="container">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                SoftSell offers unique advantages that make us the preferred choice for software license resale.
              </p>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-2 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={itemVariants} className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Secure Transactions</h3>
                  <p className="text-muted-foreground">
                    Our platform uses bank-level encryption and secure transfer protocols to protect your license data
                    and financial information.
                  </p>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Maximum Value</h3>
                  <p className="text-muted-foreground">
                    Our extensive network of buyers ensures you get the highest possible value for your unused licenses.
                  </p>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Fast Processing</h3>
                  <p className="text-muted-foreground">
                    From submission to payment, our streamlined process typically takes less than a week, compared to
                    industry averages of 30+ days.
                  </p>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Compliance Guaranteed</h3>
                  <p className="text-muted-foreground">
                    Our legal team ensures all transactions comply with software licensing agreements and transfer
                    regulations.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-20 bg-muted">
          <div className="container">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Don't just take our word for it. Here's what our customers have to say about their experience with
                SoftSell.
              </p>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-2 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={itemVariants}>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-5 w-5 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="mb-6 italic">
                      "SoftSell helped us recover over $50,000 from unused enterprise licenses after our company
                      downsized. The process was incredibly smooth, and their valuation exceeded our expectations. I
                      highly recommend their service to any business looking to recoup costs from unused software."
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="font-semibold text-primary">JD</span>
                      </div>
                      <div>
                        <p className="font-semibold">Jennifer Davis</p>
                        <p className="text-sm text-muted-foreground">CTO, TechNova Solutions</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-5 w-5 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="mb-6 italic">
                      "As a growing startup, we often found ourselves with excess licenses from overestimating our
                      needs. SoftSell provided us with a reliable way to recoup those costs and reinvest in other areas
                      of our business. Their team was professional and transparent throughout the entire process."
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="font-semibold text-primary">MR</span>
                      </div>
                      <div>
                        <p className="font-semibold">Michael Rodriguez</p>
                        <p className="text-sm text-muted-foreground">Operations Manager, Agile Innovations</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Contact Form */}
      </main>
      <Footer />
    </div>
  )
}
