import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
import Author from "./_child/author";
import Spinner from "../components/_child/spinner";
import Error from "../components/_child/error";
import fetcher from "../lib/fetcher";

const Section3 = () => {
  const { data, isLoading, isError } = fetcher("api/popular");
  if (isLoading) return <Spinner />;
  if (isError) return <Error />;
  return (
    <section className="container mx-auto md:px-20 py-16">
      <h1 className="font-bold text-4xl py-12 text-center">Most Popular</h1>
      <Swiper breakpoints={{ 640: { slidesPerView: 2, spaceBetween: 20 } }}>
        {data.map((value, index) => (
          <SwiperSlide key={index}>
            <Popular data={value} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

const Popular = ({ data }) => {
  const { id, title, category, img, published, description, author } = data;
  return (
    <div className="grid">
      <div className="images">
        <Link href={`/posts/${id}`}>
          <a>
            <Image src={img} width={600} height={400} alt="" />
          </a>
        </Link>
      </div>
      <div className="info flex justify-center flex-col py-4">
        <div className="cat">
          <Link href={`/posts/${id}`}>
            <a className="text-orange-600 hover:text-orange-800">{category}</a>
          </Link>
          <Link href={`/posts/${id}`}>
            <a className="text-gray-800 hover:text-gray-600">{published}</a>
          </Link>
        </div>
        <div className="title">
          <Link href={`/posts/${id}`}>
            <a className="text-3xl md:text-4xl font-bold text-gray-800 hover:text-gray-600 ">
              {title}
            </a>
          </Link>
        </div>
        <p className="text-grey-500 py-3 ">{description}</p>
        <h1>{author ? <Author {...author} /> : ""}</h1>
      </div>
    </div>
  );
};
export default Section3;
