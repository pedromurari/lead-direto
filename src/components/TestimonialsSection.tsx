
import { Play, Star, X } from 'lucide-react';
import { useState } from 'react';

export const TestimonialsSection = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const testimonials = [
    {
      id: 6,
      name: "Aluno IDM",
      role: "",
      thumbnail: "https://img.youtube.com/vi/wDQiV0VoBT4/maxresdefault.jpg",
      videoUrl: "https://youtube.com/shorts/wDQiV0VoBT4?feature=share",
      embedUrl: "https://www.youtube.com/embed/wDQiV0VoBT4",
      quote: "Transformei minha vida através da psicanálise."
    },
    {
      id: 1,
      name: "Aluno IDM",
      role: "",
      thumbnail: "https://img.youtube.com/vi/D4xbxCXSWoM/maxresdefault.jpg",
      videoUrl: "https://youtube.com/shorts/D4xbxCXSWoM?feature=share",
      embedUrl: "https://www.youtube.com/embed/D4xbxCXSWoM",
      quote: "A formação do iDM transformou completamente minha vida."
    },
    {
      id: 2,
      name: "Aluno IDM",
      role: "",
      thumbnail: "https://img.youtube.com/vi/g5-wCsj1D_0/maxresdefault.jpg",
      videoUrl: "https://youtube.com/shorts/g5-wCsj1D_0?feature=share",
      embedUrl: "https://www.youtube.com/embed/g5-wCsj1D_0",
      quote: "O método integrativo me deu ferramentas práticas que uso no dia a dia."
    },
    {
      id: 3,
      name: "Aluno IDM",
      role: "",
      thumbnail: "https://img.youtube.com/vi/PxDfmS4vvM8/maxresdefault.jpg",
      videoUrl: "https://youtube.com/shorts/PxDfmS4vvM8?feature=share",
      embedUrl: "https://www.youtube.com/embed/PxDfmS4vvM8",
      quote: "Recomendo o iDM para quem busca uma formação séria em Psicanálise."
    },
    {
      id: 4,
      name: "Aluno IDM",
      role: "",
      thumbnail: "https://img.youtube.com/vi/B_lpIOk1RQo/maxresdefault.jpg",
      videoUrl: "https://youtube.com/shorts/B_lpIOk1RQo?feature=share",
      embedUrl: "https://www.youtube.com/embed/B_lpIOk1RQo",
      quote: "A metodologia do iDM é única e transformadora."
    },
    {
      id: 5,
      name: "Aluno IDM",
      role: "",
      thumbnail: "https://img.youtube.com/vi/aYncgEhrXgs/maxresdefault.jpg",
      videoUrl: "https://youtube.com/shorts/aYncgEhrXgs?feature=share",
      embedUrl: "https://www.youtube.com/embed/aYncgEhrXgs",
      quote: "O iDM me deu as bases que eu precisava como psicanalista."
    }
  ];

  const handleVideoClick = (embedUrl: string) => {
    setSelectedVideo(embedUrl);
  };

  const closeModal = () => {
    setSelectedVideo(null);
  };

  return (
    <section className="py-6 md:py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Título da seção */}
          <div className="text-center mb-6 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-idm-navy mb-3 md:mb-4">
              O que dizem nossos <span className="text-idm-gold">Alunos</span>
            </h2>
            <p className="text-base md:text-xl text-gray-700 max-w-3xl mx-auto px-2">
              Histórias reais de transformação e sucesso profissional através da 
              nossa formação em Psicanálise Clínica Integrativa.
            </p>
          </div>

          {/* Grid de depoimentos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id}
                className="bg-idm-light-blue rounded-2xl p-4 md:p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                {/* Thumbnail do vídeo */}
                <div 
                  className="relative mb-3 md:mb-4 group cursor-pointer"
                  onClick={() => handleVideoClick(testimonial.embedUrl)}
                >
                  <img
                    src={testimonial.thumbnail}
                    alt={testimonial.name}
                    loading="lazy"
                    width={480}
                    height={160}
                    className="w-full h-32 md:h-40 object-cover rounded-xl"
                  />
                  <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-idm-gold rounded-full p-3">
                      <Play className="h-6 w-6 text-idm-navy fill-current" />
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 bg-white/90 rounded-full px-2 py-1 flex items-center">
                    <Play className="h-3 w-3 text-idm-navy mr-1" />
                    <span className="text-xs font-semibold text-idm-navy">Ver depoimento</span>
                  </div>
                </div>

                {/* Avaliação */}
                <div className="flex justify-center mb-2 md:mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-idm-gold fill-current" />
                  ))}
                </div>

                {/* Depoimento */}
                <blockquote className="text-gray-700 mb-3 md:mb-4 italic text-sm text-center">
                  "{testimonial.quote}"
                </blockquote>

                {/* Informações do aluno */}
                <div className="text-center">
                  <h4 className="font-bold text-idm-navy text-sm">{testimonial.name}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal do vídeo */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="relative bg-white rounded-lg max-w-4xl w-full">
            <button
              onClick={closeModal}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="h-8 w-8" />
            </button>
            <div className="aspect-video">
              <iframe
                src={selectedVideo}
                title="Depoimento"
                className="w-full h-full rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
