import React from "react";

export function Section1() {
  return (
    <div className="section active">
      <h1>Bölüm 1: Algoritma Karmaşıklığı ve BST</h1>
      <div className="card">
        <h3>Asimptotik Notasyonlar ve Arama Mantığı</h3>
        <p>Bir BST'de (İkili Arama Ağacı) arama yaparken her adımda köke bakıp "Aradığım sayı bundan küçük mü, büyük mü?" deriz. Küçükse sola, büyükse sağa gideriz. Bu yapı asimptotik notasyonlarla analiz edilir:</p>
        <ul>
          <li><strong>En Kötü Durum (Worst Case):</strong> Sayılar sürekli artan veya azalan şekilde gelmişse (1, 2, 3...), ağaç düz bir çizgi (bağlı liste) olur. Süre: <code>O(n)</code>. Denklem: <code>T(n) = T(n-1) + c</code></li>
          <li><strong>En İyi/Ortalama Durum:</strong> Ağaç dengeliyse (örn. AVL veya Kırmızı-Siyah ağacı gibi), her adımda seçenekleri yarıya indiririz. Süre: <code>O(log n)</code>. Denklem: <code>T(n) = T(n/2) + c</code> (Master Theorem Case 2'ye göre).</li>
        </ul>
        <p style={{ marginTop: "10px", color: "var(--secondary-accent)" }}><strong>Master Theorem Hatırlatması:</strong> <code>T(n) = aT(n/b) + f(n)</code> formülünde BST için <code>a=1, b=2, f(n)=c</code>'dir. Bu da bizi doğrudan <code>O(log n)</code> sonucuna götürür.</p>
      </div>

      <div className="card">
        <h3>Düğüm Silme (Deletion) Senaryoları</h3>
        <p>Ağaçtan düğüm silmek, eklemekten çok daha karmaşıktır. 3 ana senaryo vardır:</p>
        <ul>
          <li><strong>Yaprak Düğüm Silme:</strong> Direkt silinir, ebeveynin göstericisi <code>null</code> yapılır. En zahmetsiz işlemdir.</li>
          <li><strong>Tek Çocuklu Düğüm Silme:</strong> Silinen düğümün çocuğu, silinen düğümün ebeveynine bağlanır (Düğüm aradan çıkarılıp bypass edilir).</li>
          <li><strong>İki Çocuklu Düğüm Silme:</strong> İşlem oldukça karmaşıktır. Sağ alt ağacın en küçük elemanı (<em>Inorder Successor</em>) bulunur, değeri silinecek düğüme kopyalanır ve asıl successor silinir.</li>
        </ul>
      </div>

      <div className="trap-box">
        <h4>Sınav Tuzağı: İteratif Ekleme</h4>
        <p>Özyineli (recursive) fonksiyonlar belleği şişirir (Call Stack). Bu yüzden while döngüsü ile ağacın dibine kadar (null bulana kadar) ineriz.</p>
        <pre>
{`Node current = root;
Node parent = null;
while(current != null) {
    parent = current; // BİR NUMARALI TUZAK!
    if(val < current.val) current = current.left;
    else current = current.right;
}`}
        </pre>
        <p><strong>Soru:</strong> Koddaki <code>parent = current;</code> satırını silersek ne olur?<br/>
        <strong>Cevap:</strong> Döngü <code>current = null</code> olduğunda durur. Bulduğumuz o boşluğa yeni düğümü eklememiz lazım ama nerede olduğumuzu unutursak ekleyemeyiz. <code>parent</code> değişkeni, boşluğa düşmeden önceki son basamağı (ebeveyni) tutar.</p>
      </div>

      <div className="card">
        <h3>Ağaçlarda Gezinme (Traversals)</h3>
        <p>Bütün düğümlere 1 kez uğramak zorundayız, bu yüzden hepsinin zaman karmaşıklığı <code>Θ(n)</code>'dir. Formülü: <code>T(n) = T(k) + T(n-k-1) + c</code></p>
        <ul>
          <li><strong>Inorder (Sol-Kök-Sağ):</strong> Sayıları küçükten büyüğe sıralı verir. (Test sorusu bankosu). Mantık: Önce sol çocuğu bitir, sonra kendini yazdır, en son sağa geç.</li>
          <li><strong>Preorder (Kök-Sol-Sağ):</strong> Ağacın birebir kopyasını oluşturmak veya ifade ağaçlarında (Expression Trees) prefix notasyonu elde etmek için kullanılır.</li>
          <li><strong>Postorder (Sol-Sağ-Kök):</strong> Ağacı bellekten silmek (yok etmek) için kullanılır (Kural: Önce çocukları sil, sonra babayı sil).</li>
          <li><strong>Level Order (Seviye Seviye):</strong> Yukarıdan aşağıya kat kat gezer. <strong>Kuyruk (Queue - FIFO)</strong> kullanılır. Klasik BFS (Genişliğine Arama) mantığıdır.</li>
        </ul>
      </div>
    </div>
  );
}

export function Section2() {
  return (
    <div className="section active">
      <h1>Bölüm 2: Hashing ve Kod Mimarisi</h1>
      
      <div className="card">
        <h3>Hash Fonksiyonları</h3>
        <p>İyi bir hash fonksiyonu hızlı hesaplanmalı ve verileri tabloya homojen şekilde dağıtmalıdır.</p>
        <ul>
          <li><strong>Bölme Yöntemi (Division Method):</strong> <code>h(k) = k mod M</code>. Burada M genellikle asal sayı seçilir. Çift sayı veya 2'nin kuvvetleri seçilirse alt bitlerin tekrarına kurban gidebiliriz.</li>
          <li><strong>Çarpma Yöntemi (Multiplication Method):</strong> <code>h(k) = floor(M * (k * A mod 1))</code>. Burada A, 0 ile 1 arasında bir sabittir (Genellikle Altın Oran 0.618 kullanılır). Tablo boyutundan (M) bağımsız olarak dengeli çalışır.</li>
        </ul>
      </div>

      <div className="trap-box">
        <h4>Sınav Tuzağı: Hash Fonksiyonu Bitwise AND</h4>
        <pre>{`int index = (key.hashCode() & 0x7fffffff) % tableSize;`}</pre>
        <p>Java'da <code>hashCode</code> negatif sayı üretebilir. Negatif indeks programın çökmesine (ArrayIndexOutOfBounds) neden olur. Bu Bitwise AND işlemi sayının işaret bitini silip <strong>her zaman pozitif olmasını garantiler.</strong><br/>
        Sınavda <em>"Neden Math.abs() kullanılmaz?"</em> diye sorulabilir. Cevap: <code>Integer.MIN_VALUE</code> mutlak değere çevrildiğinde taşma yapar ve yine negatif kalır, ancak Bitwise AND bu istisnada bile hatasız çalışır!</p>
      </div>

      <div className="card">
        <h3>Separate Chaining (Ayrı Zincirleme - Open Hashing)</h3>
        <p>Hash fonksiyonu <code>h(k)</code> tablodaki indeksi belirler. Eğer iki veri aynı indekse denk gelirse (Çarpışma), o indekse dışarıdan bir bağlı liste (Linked List) kurar, elemanları uç uca ekleriz.</p>
        <ul>
          <li><strong>Avantajı:</strong> Tablo boyutunu aşan sayıda eleman eklenebilir (Yük faktörü α &gt; 1 olabilir).</li>
          <li><strong>Dezavantajı:</strong> Boş slotlarda fazladan pointer belleği (next referansı) israf edilir ve önbellek dostu (cache-friendly) değildir.</li>
        </ul>
      </div>

      <div className="trap-box">
        <h4>Sınav Tuzağı: Separate Chaining'de Silme</h4>
        <p>Silme kodunda <code>n.key</code>'e değil, <code>n.next.key</code>'e bakılarak ilerlenir. Neden? Çünkü tek yönlü bağlı listede bir elemanı silmek için, bir önceki elemanın (ebeveyn) yerini bilmen gerekir ki bağlantıyı koparıp (<code>n.next = n.next.next</code>) aradaki istenmeyen elemanı düşürebilesin.</p>
      </div>

      <div className="card">
        <h3>Closed Hashing (Açık Adresleme)</h3>
        <p>Bağlı liste yok! Tüm veriler tablonun ana dizisinde (kendi içinde) tutulur. Slot doluysa belirlenen kurala göre bir sonraki adrese atlanır.</p>
        <ul>
          <li><strong>Linear Probing (Doğrusal Atama):</strong> <code>h(k, i) = (h'(k) + i) mod M</code>. Birincil Kümelenme (Primary Clustering) yapar, dolu slotlar yan yana bloklaşır ve performansı düşürür.</li>
          <li><strong>Quadratic Probing (Karesel Atama):</strong> <code>h(k, i) = (h'(k) + i^2) mod M</code>. İkincil Kümelenme (Secondary Clustering) yapar. Aynı hash değerine sahip olanlar aynı atlama dizisini izler.</li>
          <li><strong>Double Hashing (Çift Hash):</strong> <code>h(k, i) = (h1(k) + i * h2(k)) mod M</code>. Kümelenmeyi önleyen en iyi yöntemdir, ancak h2(k)'nın hiçbir zaman 0 sonucunu vermemesi hayati önem taşır (yoksa sonsuz döngü olur).</li>
        </ul>
      </div>

      <div className="trap-box">
        <h4>En Büyük Kod Tuzağı: Mezar Taşı (Tombstone)</h4>
        <p>Linear probing'de silinen elemanın yerini <code>null</code> YAPAMAZSIN. Yaparsan arama zinciri kopar. Koda <code>table[i].deleted = true;</code> bayrağı eklenir (Buna Lazy Deletion denir). Arama yaparken de <code>!table[i].deleted</code> kontrolü ile oranın sadece "silinmiş" bir mezar taşı olduğunu anlar ve aramaya devam ederiz.</p>
      </div>
    </div>
  );
}

export function Section3() {
  return (
    <div className="section active">
      <h1>Bölüm 3: Hashing İstatistikleri</h1>
      <p>Sistemin matematiksel analizinin yapıldığı yer. Temel metrik: <strong>α = N/M</strong> (Yük faktörü = Dolu Eleman / Toplam Slot oranı).</p>

      <div className="card">
        <h3>Poisson Dağılımı ve Boş Slot İhtimali</h3>
        <p>M tane slot ve N tane anahtar (key) olduğunu varsayalım. Binom dağılımının limitini alarak sistemi <strong>Poisson Dağılımına</strong> dönüştürüyoruz.</p>
        <ul>
          <li>Bir slotun <strong>tamamen boş kalma ihtimali</strong>: <code>e^(-α)</code>'dır.</li>
          <li>Bir slota tam olarak <strong>1 eleman düşme ihtimali</strong>: <code>α * e^(-α)</code>'dır.</li>
        </ul>
        <p style={{ marginTop: "10px", color: "var(--secondary-accent)" }}><strong>Örnek Olay:</strong> Tablo boyutu kadar eleman eklediniz (α=1). Bu durumda boş slot oranı = <code>e^(-1) ≈ %36.8</code> olur. Yani tablo dışarıdan "dolu" gibi görünse de aslında slotların %36'sı tamamen boştur, kalan %64'lük kısımda ise yoğun çakışmalar (2'den fazla eleman) vardır!</p>
      </div>

      <div className="card">
        <h3>Open Hashing Beklenen Arama Süresi</h3>
        <p>Separate Chaining yönteminde listeler eşit dağılmışsa:</p>
        <ul>
          <li><strong>Başarılı bir arama yapmak</strong> ortalama <code>1 + (α/2)</code> adım sürer.</li>
          <li><strong>Başarısız bir arama yapmak</strong> ise bağlı listelerin sonuna kadar gitmeyi gerektirdiğinden ortalama <code>α</code> adım sürer.</li>
        </ul>
        <p>Bu sistemin gücü, α (yük faktörü) 1'i geçse bile (örneğin tablo 100 kapasiteli, siz 500 eleman eklediniz, α=5 olur) ortalama arama süresinin sadece 1 + 2.5 = 3.5 adımda tamamlanmasıdır.</p>
      </div>

      <div className="trap-box">
        <h4>Sınav Tuzağı: Closed Hashing (Linear Probing) Çöküş İspatı</h4>
        <p>Linear Probing'de beklenen maliyetler çok farklı bir formüle dayanır:</p>
        <ul>
          <li>Başarısız arama maliyeti: <strong>≈ 0.5 * (1 + 1 / (1-α)^2)</strong></li>
          <li>Başarılı arama maliyeti: <strong>≈ 0.5 * (1 + 1 / (1-α))</strong></li>
        </ul>
        <p><strong>Bu formüllerin pratik anlamı nedir?</strong> Eğer tablo yarı yarıya doluysa (α = 0.5), başarılı arama yaklaşık 1.5 adım, başarısız arama 2.5 adım sürer. Ancak tablo %90 doluluğa ulaşırsa (α = 0.9), başarısız arama maliyeti <strong>50.5 adıma</strong> fırlar! Linear probing, yük faktörü %70'i geçmeye başladığında kümeler birleştiği için resmen felç geçirir.</p>
      </div>
    </div>
  );
}

export function Section4() {
  return (
    <div className="section active">
      <h1>Bölüm 4: B-Tree (Dengeli Disk Ağaçları)</h1>
      <p>Milyonlarca veriyi kısa boylu bir ağaçta tutma sanatı. Veritabanları ve dosya sistemlerinde RAM'e değil diske yazarken yaşanan "Disk I/O darboğazını" çözmek için icat edilmişlerdir.</p>

      <div className="card">
        <h3>Neden B-Tree? Disk I/O Maliyeti Gerçeği</h3>
        <p>RAM okuma hızı nanosaniyeler iken, Mekanik bir diskin okuma süresi (Seek time) milisaniyelerdir (Yani 100.000 kat daha yavaş). İkili ağaçlar (BST) uzun yapılı oldukları için veriyi bulana kadar defalarca diskten okuma yapar. B-Tree ise bir disk bloğuna (örn. 4KB veya 8KB) olabildiğince çok anahtar (key) sığdırarak ağacın boyunu kısaltır. Böylece sadece 2-3 disk okumasıyla milyarlarca veriye anında erişilir.</p>
      </div>

      <div className="card">
        <h3>Kurallar (Derece t) ve Mekanikler</h3>
        <ul>
          <li><strong>Kapasite:</strong> Kök (Root) hariç her düğüm en az <code>t-1</code>, en fazla <code>2t-1</code> anahtar (key) barındırmak zorundadır.</li>
          <li><strong>Çocuk Sayısı:</strong> Bir düğümde <code>k</code> tane anahtar varsa, o düğümün tam olarak <code>k+1</code> tane çocuğu (dalı) olmalıdır.</li>
          <li><strong>Denge:</strong> Bütün yapraklar (leaf nodes) birebir aynı derinlikte olmak zorundadır. BST'nin aksine B-Tree yukarıya doğru (köke doğru) büyür.</li>
          <li><strong>Maliyet:</strong> Arama, ekleme ve silme işlemlerinin Disk I/O maliyeti <code>O(log_t n)</code>'dir.</li>
        </ul>
      </div>

      <div className="trap-box">
        <h4>Sınav Tuzağı: Proactive Splitting (Önceden Bölme İşlemi)</h4>
        <p>B-Tree'de eleman her zaman en alt seviyeye (yaprağa) eklenir. Ancak ekleme algoritması yukarıdan aşağı inerken, kapasitesi dolmuş (<code>2t-1</code> elemana ulaşmış) bir düğüm görürse, ileride geriye dönüp düzeltmek çok pahalı olacağı için onu <strong>ortadan ikiye böler (split)</strong> ve ortanca elemanı yukarı (ebeveyne) iter.<br/>
        <em>Sınav taktiği: Hoca adım adım B-Tree çizdirirse, ekleme yapacağınız yere giderken yolda gördüğünüz "dolu" düğümleri mutlaka önce bölün, sonra ilerleyin!</em></p>
      </div>
      
      <div className="trap-box">
        <h4>Sınav Tuzağı: B-Tree'de Silme (Deletion Underflow)</h4>
        <p>Eğer silinecek eleman bir iç düğümdeyse (yaprak değilse), kendisinden bir küçük (predecessor) veya bir büyük (successor) yaprak elemanla yer değiştirilip öyle silinir. <br/>
        Silme işlemi sonucunda düğümdeki eleman sayısı <code>t-1</code> sınırının altına düşerse (underflow), <strong>sağ veya sol kardeşten eleman ödünç alınır.</strong> Kardeşlerde de sadece t-1 eleman varsa, iki kardeş ve aralarındaki ebeveyn anahtarı <strong>birleştirilir (merge)</strong>.</p>
      </div>
    </div>
  );
}

export function Section5() {
  return (
    <div className="section active">
      <h1>Bölüm 5: Graf Teorisi Temelleri</h1>
      <p>Düğümlerin (Vertex) kenarlarla (Edge) birbirine bağlandığı matematiksel modelleme aracıdır.</p>

      <div className="card">
        <h3>Graf Türleri ve Bellek Gösterimi (Representation)</h3>
        <ul>
          <li><strong>Yönlü / Yönsüz Graflar:</strong> Kenarların (yolların) tek yönlü mü çift yönlü mü olduğu. Yönsüz graflarda maksimum kenar sayısı <code>V(V-1)/2</code>, yönlülerde <code>V(V-1)</code>'dir.</li>
          <li><strong>Adjacency Matrix (Komşuluk Matrisi):</strong> V x V boyutunda iki boyutlu dizidir. İki düğüm arasında bağlantı varsa 1 (veya ağırlık), yoksa 0 yazılır. Yoğun (Dense) graflar için idealdir. Bellek maliyeti: <code>O(V^2)</code>. Bir kenarı sorgulamak sadece <code>O(1)</code> sürer.</li>
          <li><strong>Adjacency List (Komşuluk Listesi):</strong> Her düğüm için kime bağlı olduğunu tutan bağlı listeler (Linked Lists) dizisidir. Seyrek (Sparse) graflar için en verimli yapıdır. Bellek maliyeti: <code>O(V+E)</code>. Ancak bir kenarın varlığını sorgulamak listeyi taramayı gerektirdiğinden yavaş olabilir.</li>
        </ul>
      </div>

      <div className="trap-box">
        <h4>Sınav Tuzağı: Hamilton ve Euler Macerası</h4>
        <p>Bu iki konsept sıkça birbirine karıştırılır:</p>
        <ul>
          <li><strong>Hamilton Döngüsü:</strong> Bütün <strong>DÜĞÜMLERİ</strong> (Şehirleri) tam 1 kez gezdiğin rotadır. Çözümü zor bir problemdir (NP-Complete). Meşhur "Gezgin Satıcı Problemi (TSP)" buraya dayanır.</li>
          <li><strong>Euler Döngüsü:</strong> Bütün <strong>KENARLARI</strong> (Yolları) tam 1 kez gezdiğin, kalemi kağıttan kaldırmadan başlangıca döndüğün rotadır. Şartı çok basittir: Graf bağlantılı olmalı ve <strong>tüm düğümlerin derecesi çift sayı olmalıdır.</strong> (Eğer sadece 2 düğmenin derecesi tek ise, Euler yolu vardır ama döngüsü yoktur).</li>
        </ul>
      </div>
    </div>
  );
}

export function Section6() {
  return (
    <div className="section active">
      <h1>Bölüm 6: Graflarda Gezinme (DFS ve BFS)</h1>
      <p>Her iki algoritma da tüm düğümleri ve kenarları tarar. Adjacency List (Komşuluk Listesi) kullanıldığında her ikisinin de Zaman Karmaşıklığı <strong><code>O(V + E)</code></strong>'dir.</p>

      <div className="card">
        <h3>Derinliğine Arama (DFS - Depth First Search)</h3>
        <p>Mantığı karanlık bir labirente dalmaktır. Gidebildiğin en dibe gidip çıkmaza girince geri dönersin (Backtracking). Algoritma doğası gereği Özyineli (Recursive) çalışır veya iteratif uygulanacaksa <strong>Yığıt (Stack - LIFO)</strong> kullanılır.</p>
        <ul>
          <li><strong>Kullanım Alanları:</strong> Grafta Döngü (Cycle) tespiti, Topolojik Sıralama (Topological Sort - birbirine bağlı derslerin veya görevlerin sıralanması), Bağlantılı Bileşen (Connected Components) tespiti.</li>
        </ul>
        <p style={{ color: "var(--warning)", marginTop: "10px" }}><strong>Masaüstü Testi Tuzağı:</strong> İteratif DFS kodunda komşular Stack'e atılırken (örn: A düğümünden sonra B ve C atıldıysa), Stack mantığı gereği en son atılan C'dir ve ilk C'den çıkarak yoluna devam eder. Sınavdaki çıktı tahmin sorularında bu ters sıraya dikkat edin!</p>
      </div>

      <div className="card">
        <h3>Genişliğine Arama (BFS - Breadth First Search)</h3>
        <p>Suya atılan bir taşın dalgaları gibi, önce 1 birim uzaktakiler, sonra 2 birim uzaktakiler seviye seviye taranarak gezilir. Bunu başarmak için <strong>Kuyruk (Queue - FIFO)</strong> veri yapısı kullanılır.</p>
        <ul>
          <li><strong>Kullanım Alanları:</strong> İki Parçalı (Bipartite) graf tespiti, Ağ içi iletişim yayınları (Broadcasting), Sosyal medyadaki "Arkadaş tavsiyesi" veya "Sana 2. derece uzaklıkta" özellikleri.</li>
        </ul>
      </div>

      <div className="trap-box">
        <h4>Sınav Bankosu: En Kısa Yol (Shortest Path)</h4>
        <p>Ağırlıksız (Tüm kenar uzunlukları 1 birim) bir grafta A'dan B'ye <strong>En Kısa Yolu</strong> garanti eden algoritma hangisidir? <br/>
        Cevap kesinlikle <strong>BFS</strong>'dir. DFS, labirente daldığı için hedefe çok dolambaçlı bir yoldan ulaşabilir. Fakat BFS dalga dalga yayıldığı için, B düğümüyle ilk karşılaştığı an, o yol en kısa yoldur.</p>
      </div>
    </div>
  );
}

export function Section7() {
  return (
    <div className="section active">
      <h1>Bölüm 7: MST ve Kruskal Algoritması</h1>
      <p><strong>MST (Minimum Spanning Tree - Minimum Kapsayan Ağaç):</strong> Bir graftaki tüm düğümleri birbirine bağlayan, ancak kenarların ağırlık (maliyet) toplamı en az olan alt ağaçtır. Adı üstünde "ağaç" olduğu için asla döngü (cycle) içeremez. V adet düğüm varsa tam olarak V-1 kenar içerir.</p>

      <div className="card">
        <h3>Prim vs Kruskal Karşılaştırması</h3>
        <ul>
          <li><strong>Prim Algoritması:</strong> Herhangi bir başlangıç düğümü seçer ve kendi komşularından en ucuz olanı alarak büyür (Tıpkı Dijkstra gibi Priority Queue kullanır). Kenar sayısının çok fazla olduğu <strong>Yoğun (Dense) graflarda</strong> Kruskal'dan daha verimlidir. Maliyeti: <code>O(E log V)</code>.</li>
          <li><strong>Kruskal Algoritması:</strong> Mantığı tamamen Açgözlüdür (Greedy). Tüm grafın kenarlarını ağırlıklarına göre ucuzdan pahalıya doğru sıralar. Sırayla en ucuzunu seçer, eğer bu kenar grafikte bir döngü oluşturmuyorsa ağa ekler. Kenar sayısının az olduğu <strong>Seyrek (Sparse) graflarda</strong> rakipsizdir. Maliyeti (sıralama işleminden dolayı) <code>O(E log E)</code>'dir.</li>
        </ul>
      </div>

      <div className="trap-box">
        <h4>Sınav Tuzağı: Disjoint Set (Union-Find) ve Yol Sıkıştırma</h4>
        <p>Kruskal, iki düğüm arasına çizgi çektiğinde döngü oluşup oluşmayacağını Disjoint Set mimarisindeki <code>find(x) == find(y)</code> fonksiyonu ile anlar. Eğer iki düğümün de en tepedeki atası (parent) aynıysa, aralarına çizgi çekmek döngü yaratır.</p>
        <ul>
          <li><strong>Yol Sıkıştırma (Path Compression):</strong> Koddaki meşhur <code>parent[i] = find(parent[i])</code> satırı, arama yaparken geçilen tüm düğümlerin atalarını direkt olarak en tepeye bağlar. Ağacı dümdüz hale getirerek sonraki arama maliyetlerini dramatik bir şekilde düşürür.</li>
          <li><strong>Rank ile Birleştirme (Union by Rank):</strong> İki farklı ağaç birleşirken boyu (derinliği) kısa olan, boyu uzun olanın köküne eklenir ki genel ağacın derinliği artmasın.</li>
        </ul>
        <p style={{ marginTop: "10px" }}><em>Not: Bu iki optimizasyon birlikte kullanıldığında işlemlerin karmaşıklığı <strong>Ters Ackermann Fonksiyonu <code>O(α(V))</code></strong> seviyesine iner ki bu pratik uygulamalarda <code>O(1)</code> kabul edilir. Kruskal'ın asıl zamanını alan şey Union-Find değil, kenarların başta sıralanmasıdır.</em></p>
      </div>
    </div>
  );
}
