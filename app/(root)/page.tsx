import { Collection } from "@/components/shared/Collection"
import { navLinks } from "@/constants"
import { transformationTypes } from "@/constants"
import { getAllImages } from "@/lib/actions/image.actions"
import { auth } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"

const features = [
  {
    name: transformationTypes.restore.title,
    description: transformationTypes.restore.subTitle,
    icon: `/assets/icons/${transformationTypes.restore.icon}`,
  },
  {
    name: transformationTypes.fill.title,
    description: transformationTypes.fill.subTitle,
    icon: `/assets/icons/${transformationTypes.fill.icon}`,
  },
  {
    name: transformationTypes.remove.title,
    description: transformationTypes.remove.subTitle,
    icon: `/assets/icons/${transformationTypes.remove.icon}`,
  },
  {
    name: transformationTypes.recolor.title,
    description: transformationTypes.recolor.subTitle,
    icon: `/assets/icons/${transformationTypes.recolor.icon}`,
  },
  {
    name: transformationTypes.removeBackground.title,
    description: transformationTypes.removeBackground.subTitle,
    icon: `/assets/icons/${transformationTypes.removeBackground.icon}`,
  },
]

const Home = async ({ searchParams }: SearchParamProps) => {
  const { userId } = auth();

  // If user is NOT signed in, show the landing page
  if (!userId) {
    return (
      <div className="min-h-screen bg-white">
        {/* Navigation Bar */}
        <nav className="landing-nav">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/assets/images/logo-text.svg" alt="ImageAI" width={150} height={28} />
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/sign-in" className="p-16-medium text-dark-600 hover:text-purple-600 transition-colors">
              Sign In
            </Link>
            <Link href="/sign-up" className="landing-nav-btn">
              Get Started
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="landing-hero" style={{ paddingTop: '5rem' }}>
          <div className="landing-hero-content">
            <h1 className="landing-title">
              Unleash Your Creative Vision with <span style={{ color: '#BCB6FF' }}>ImageAI</span>
            </h1>
            <p className="landing-subtitle">
              Transform your images with the power of AI. Restore old photos, remove backgrounds, 
              recolor objects, and so much more — all in just a few clicks.
            </p>
            <Link href="/sign-up" className="landing-cta-btn">
              <Image src="/assets/icons/stars.svg" alt="stars" width={20} height={20} />
              Try Now — It&apos;s Free
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="landing-features">
          <div className="landing-features-header">
            <h2 className="landing-features-title">
              Powerful AI Features
            </h2>
            <p className="landing-features-subtitle">
              Everything you need to transform your images, powered by cutting-edge AI technology.
            </p>
          </div>

          <div className="landing-features-grid">
            {features.map((feature) => (
              <div key={feature.name} className="landing-feature-card">
                <div className="landing-feature-icon">
                  <Image
                    src={feature.icon}
                    alt={feature.name}
                    width={28}
                    height={28}
                    className="brightness-200"
                  />
                </div>
                <h3 className="landing-feature-name">{feature.name}</h3>
                <p className="landing-feature-desc">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA Section */}
        <section className="landing-bottom-cta">
          <h2 className="landing-bottom-title">
            Ready to Transform Your Images?
          </h2>
          <p className="landing-bottom-text">
            Join thousands of creators using ImageAI to bring their creative visions to life.
          </p>
          <Link href="/sign-up" className="landing-cta-btn-gradient">
            <Image src="/assets/icons/image.svg" alt="image" width={20} height={20} className="brightness-200" />
            Get Started for Free
          </Link>
        </section>

        {/* Footer */}
        <footer className="landing-footer">
          Made with ❤️ by Arindam Saha
        </footer>
      </div>
    )
  }

  // If user IS signed in, show the existing dashboard
  const page = Number(searchParams?.page) || 1;
  const searchQuery = (searchParams?.query as string) || '';

  const images = await getAllImages({ page, searchQuery})

  return (
    <>
      <section className="home">
        <h1 className="home-heading">
          Unleash Your Creative Vision with Imaginify
        </h1>
        <ul className="flex-center w-full gap-20">
          {navLinks.slice(1, 5).map((link) => (
            <Link
              key={link.route}
              href={link.route}
              className="flex-center flex-col gap-2"
            >
              <li className="flex-center w-fit rounded-full bg-white p-4">
                <Image src={link.icon} alt="image" width={24} height={24} />
              </li>
              <p className="p-14-medium text-center text-white">{link.label}</p>
            </Link>
          ))}
        </ul>
      </section>

      <section className="sm:mt-12">
        <Collection 
          hasSearch={true}
          images={images?.data}
          totalPages={images?.totalPage}
          page={page}
        />
      </section>
      <footer className="footer">
        made with love by arindam saha 
      </footer>

    </>
  )
}

export default Home