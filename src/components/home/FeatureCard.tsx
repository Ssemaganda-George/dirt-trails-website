
interface FeatureCardProps {
  title: string;
  description: string;
  iconUrl: string;
}

const FeatureCard = ({ title, description, iconUrl }: FeatureCardProps) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
      <div className="w-16 h-16 rounded-full overflow-hidden mb-6">
        <img src={iconUrl} alt={title} className="w-full h-full object-cover" />
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default FeatureCard;
