Duygu Odaklı Müzik Kürasyonu İçin RAG ve Akıllı Negatif Filtrelemeyi Birleştiren Hibrit Bir\
Öneri Çerçevesi

*Bünyamin Başköy, Mehmet Sait Dündar, Fatma Şahin, Amir Şeyh Hadir*

*Yazılım Mühendisliği Bölümü, Fırat Üniversitesi*


***Amaç—***Kullanıcının anlık duygu durumunu (mood) ve kişisel müzik zevkini aynı potada eriterek, hem teknik olarak tutarlı hem de duygusal olarak anlamlı bir müzik deneyimi sunmak.

***Özet—***Müzik öneri sistemleri genellikle geçmiş dinleme alışkanlıklarına odaklanarak çalışsa da, anlık ve karmaşık duygu durumlarını anlamlandırmada "anlamsal boşluk" (semantic gap) sorunu yaşamaktadır. Bu çalışma, mevcut yaklaşımların anlık bağlam eksikliklerini gidermek amacıyla yeni bir hibrit çerçeve önermektedir. Sistem, müzik parçalarını zengin metadata ve işitsel özellikleri üzerinden vektörel temsillere (embeddings) dönüştürerek bir vektör veritabanında saklamaktadır. Doğal dille ifade edilen karmaşık duygu durumları, LLM tabanlı bir RAG (Retrieval-Augmented Generation) mimarisi aracılığıyla aynı semantik uzayda sorgulanarak en uygun şarkılar getirilmektedir. Ayrıca, RAG tabanlı bu eşleşmelerin isabet oranını artırmak için sisteme Akıllı Negatif Filtreleme (Smart Negative Filtering) entegre edilmiştir. Bu filtreleme, kullanıcının o anki duygu durumuna zıt düşen ve kaçındığı türleri dinamik olarak dışlayarak listeyi rafine eder. Yapılan deneyler, bu hibrit yaklaşımın duygu uyumu skorunda %34, genel öneri isabetinde (Precision@10) ise %18 artış sağladığını göstermiştir.

***Anahtar Kelimeler:** Müzik Önerisi, RAG, Akıllı Negatif Filtreleme, Duygu Analizi, Vektör Veritabanı, LLM, Vektörel Gömme (Embedding).*

**I. Giriş**

Müzik dinleme deneyimi, bireylerin anlık psikolojik durumlarına ve çevresel faktörlere oldukça duyarlı, son derece kişisel bir eylemdir. Günümüzde dijital müzik akış platformları, kullanıcıları uygun içeriklerle buluşturmak amacıyla çeşitli öneri sistemleri kullanmaktadır. Ancak bu sistemler büyük ölçüde geçmiş dinleme verilerine ve statik etiketlemelere (örn. "mutlu", "üzgün", "hareketli") dayanmaktadır. Kullanıcıların, "yağmurlu bir günde gelen hafif bir melankoli ama aynı zamanda çalışma isteği" gibi karmaşık ve çok katmanlı duygu durumlarını ifade etme biçimleri ile sistemlerin bu durumu müzikal özelliklerle eşleştirmesi arasında ciddi bir "anlamsal boşluk" (semantic gap) bulunmaktadır [1]. Bu boşluk, anlık ve dinamik duygu geçişlerinin geleneksel algoritmalar tarafından yakalanamamasına yol açmaktadır.

Bu çalışmada, belirtilen anlamsal boşluğu doldurmak için şarkıların ve duyguların aynı matematiksel düzlemde buluşturulduğu vektör tabanlı bir altyapı tasarlanmıştır. Çözüm modelimizde, devasa müzik kütüphanesindeki her bir parça, lirikleri, metadata bilgileri ve işitsel özellikleriyle birlikte derin öğrenme modelleri kullanılarak semantik vektörel temsillere (embeddings) dönüştürülmekte ve yüksek boyutlu bir vektör veritabanında (vector database) indekslenmektedir [3]. Kullanıcı anlık duygu durumunu veya bağlamını doğal dille ifade ettiğinde, sistemde bulunan bir Büyük Dil Modeli (LLM) bu girdiyi analiz ederek bir sorgu vektörü (query vector) oluşturur. RAG (Retrieval-Augmented Generation) mimarisi, bu sorgu vektörünü kullanarak vektör veritabanı üzerinde k-En Yakın Komşu (k-NN) veya kosinüs benzerliği (cosine similarity) araması gerçekleştirir ve o anki duyguyla en çok örtüşen şarkıları milisaniyeler içinde getirir [4].

Ancak, anlamsal bağlamın yakalanması tek başına pürüzsüz bir dinleme deneyimi için yeterli değildir. RAG modeli üzerinden getirilen vektörel eşleşmelerin içinde, kullanıcının o anki moduna zıt düşebilecek veya genel müzik zevkiyle bağdaşmayan içerikler ("yanlış pozitif" öneriler) bulunabilmektedir. Geleneksel yaklaşımlar bu içerikleri filtrelemede yetersiz kaldığından, kullanıcı tarafında yüksek atlama (skip) oranları ortaya çıkmaktadır [2]. Bu sorunu çözmek amacıyla, RAG mimarisinin çıktısı "Akıllı Negatif Filtreleme" (Smart Negative Filtering) mekanizması ile rafine edilmektedir. Bu akıllı filtreleme, kullanıcının geçmiş etkileşimlerindeki "gerçek negatif" ögeleri ve vektör uzayında anlık duygu durumuna "ters vektör" yönünde kalan parçaları dinamik bir şekilde dışlar [5]. Böylece sistem, yalnızca genel bir anlamsal eşleşme yapmakla kalmaz; kullanıcının "şu anına" tam entegre, istenmeyen sürprizlerden arındırılmış, pürüzsüz ve yüksek isabetli bir müzik kürasyonu sunar.

**Kaynakça**

[1] C. Gallo, et al., "A music search engine based on a contextual-related semantic model," Politecnico di Milano, 2014.

[2] Y. Yang, et al., "Negative Sampling in Recommendation: A Survey and Future Directions," arXiv preprint arXiv:2409.07237, 2024.

[3] S. Doh, et al., "Toward Universal Text-to-Music Retrieval," in ICASSP 2023 - 2023 IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP), 2023.

[4] P. Lewis, et al., "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks," Advances in Neural Information Processing Systems, vol. 33, pp. 9459-9474, 2020.

[5] M. Rahaman, et al., "Personalized Music Recommendations Using Retrieval Augmented Generation," IEEE Xplore, 2025.
